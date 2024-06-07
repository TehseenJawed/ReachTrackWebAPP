import React from "react";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import {
    GoogleMap,
    MarkerClustererF,
    MarkerF,
    DirectionsRenderer,
    Polygon,
    InfoWindow,
    DrawingManager,
    MarkerClusterer,
    Marker,
    TrafficLayerF,
    TrafficLayer,
    Circle,
    DrawingManagerF,
    PolygonF,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";
import { SELECTED_LOCATION, LIVE_VEHICLES_DATA } from "../../../redux/reducers/trackReducer";
import { BrandSVGIcon } from "assets/svg_icons";
import { useNavigate } from 'react-router-dom'

const { REACT_APP_MAP_ID } = process.env;

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

interface OnlineVehicleProps {
    liveLocation: LatLngLiteral,
    destination: LatLngLiteral,
    lastLocation: LatLngLiteral,
    plate: string,
}

interface Shape {
    type: string;
    path: google.maps.LatLngLiteral[];
    radius?: number;
}

export default function GeofenceMap({ mapData, setMapData, buffer }) {
    const [flag, setFlag] = useState(false)
    const [directions, setDirections] = useState<any>();
    const navigate = useNavigate();
    const [isStatic, setIsStatic] = useState<boolean>(false);
    const [center, setCenter] = useState({ lat: 24.901326, lng: 67.115076 })
    const mapRef = useRef<google.maps.Map | null>(null);
    const __mapMandatoryStyles = { width: '100%', height: '100%' };
    const options = useMemo<MapOptions>(
        () => ({
            mapId: REACT_APP_MAP_ID,
            // mapId: "b181cac70f27f5e6",
            disableDefaultUI: true,
            zoomControl: true,
            scrollwheel: true,
            rotateControl: false,
            clickableIcons: false,
            mapTypeControl: false,
            keyboardShortcuts: false,
            fullscreenControl: false,
            streetViewControl: true,
            disableDoubleClickZoom: false,
            isFractionalZoomEnabled: !isStatic,
            gestureHandling: isStatic ? 'none' : 'auto',
        }),
        [isStatic]
    );

    const fetchDirections = (vehicle: any) => {
        if (!vehicle) return;
        const service = new google.maps.DirectionsService();
        service.route(
          {
            origin: { lat: mapData[0]?.lat, lng: mapData[0]?.lng },
            destination: { lat: mapData[1]?.lat, lng: mapData[1]?.lng },
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === "OK" && result) {
              setDirections(result);
            }
          }
        );
      };

    const handleAddLatLng = (event) => {
        const { latLng } = event;
        console.log('mapData.length === 2', { lat: latLng.lat(), lng: latLng.lng() });
        if (mapData.length === 2) {
            return
        } else {
            const newObj = [
                ...mapData,
                { lat: latLng.lat(), lng: latLng.lng() },
            ];
            setMapData(newObj)
            setFlag(!flag)
            fetchDirections(newObj)
        }
    }

    const onLoad = useCallback((map: google.maps.Map) => {
        if (mapRef?.current) {
            mapRef.current = map;
        }
    }, []);

    new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google?.maps?.drawing?.OverlayType?.CIRCLE
    })
    console.log('Direction......',directions);
    
    useEffect(() => {
        if(mapData[1]){
            fetchDirections(mapData)
        } else {
            console.log('SETTER IS WORKING....');
            setDirections([])
        }
    },[mapData])
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
        });
        setTimeout(() => {
            setFlag(!flag)
        }, 1000)
    }, [])
    return (
        <div className="container">
            <div className="map">
                <GoogleMap
                    zoom={13}
                    center={mapData[0]}
                    onClick={handleAddLatLng}
                    mapContainerClassName="map-container"
                    mapContainerStyle={__mapMandatoryStyles}
                    options={options}
                    onLoad={onLoad}
                >
                    {directions && (
                        <DirectionsRenderer
                            // suppressMarkers={true}
                            directions={directions}
                            options={{
                                suppressMarkers: true,
                                polylineOptions: {
                                    zIndex: 50,
                                    strokeColor: "#1976D2",
                                    strokeWeight: 5,
                                },
                            }}
                        />
                    )}
                    
                    {(directions && buffer) && (
                        <DirectionsRenderer
                            // suppressMarkers={true}
                            directions={directions}
                            options={{
                                suppressMarkers: true,
                                polylineOptions: {
                                    zIndex: 0,
                                    strokeColor: "#000000",
                                    strokeWeight: 15,
                                },
                            }}
                        />
                    )}

                    {mapData && (
                        <>
                            <MarkerClusterer onClusteringBegin={(e) => console.log('RUNNNING>.....', e)}>
                                {(clusterer) =>
                                (
                                    <MarkerF
                                        key={mapData[0]?.lat}
                                        // icon={icon}
                                        // icon={{ url: redMarkerIcon }}
                                        position={{ lat: mapData[0]?.lat, lng: mapData[0]?.lng }}
                                        clusterer={clusterer}
                                        animation={window.google.maps.Animation.DROP}
                                    >
                                        {
                                            mapData[1] && (
                                                <MarkerF
                                                    position={{ lat: mapData[1]?.lat, lng: mapData[1]?.lng }}
                                                    animation={window.google.maps.Animation.DROP}
                                                // @ts-ignore
                                                // icon={'https://i.ibb.co/JCCNTjW/destination.png'}
                                                />
                                            )
                                        }
                                    </MarkerF>
                                )
                                }
                            </MarkerClusterer>
                            {/* {
                destination?.liveLocation?.lat && (
                  <Marker
                    position={{ lat: destination?.liveLocation?.lat, lng: destination?.liveLocation?.lng }}
                    animation={window.google.maps.Animation.DROP}
                    // @ts-ignore
                    icon={icon}
                  />
                )
              }
              {
                destination?.destination && (
                  <Marker
                    position={destination?.destination}
                    animation={window.google.maps.Animation.DROP}
                    // @ts-ignore
                    icon={'https://i.ibb.co/JCCNTjW/destination.png'}
                  />
                )
              } */}

                            {/* <Circle center={center} radius={1500} options={closeOptions} /> */}
                            {/* <Circle center={center} radius={3000} options={middleOptions} />
              <Circle center={center} radius={45000} options={farOptions} /> */}
                        </>
                    )}
                </GoogleMap>
            </div>
        </div>
    );
}
