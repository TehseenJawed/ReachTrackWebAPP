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
import { useDispatch, useSelector } from "react-redux";
import { SELECTED_LOCATION, LIVE_VEHICLES_DATA, SELECTED_GEOFENCE, ACTIVETRACKERVEHICLE } from "../redux/reducers/trackReducer";
import { BrandSVGIcon } from "assets/svg_icons";
import { useNavigate } from 'react-router-dom'
import { updateActiveTrackVehicle } from "../redux/actions/trackActions";
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

export default function Map() {
  const [isStatic, setIsStatic] = useState<boolean>(false);
  const [hoverCard, setHoverCard] = useState<string>("");
  const [directions, setDirections] = useState<DirectionsResult>();
  const [center, setCenter] = useState({ lat: 24.901326, lng: 67.115076 })
  const [circle, setCircle] = useState<any>({ center: {}, radius: 0 })
  const dispatch = useDispatch()
  const selectedGeofence = useSelector(SELECTED_GEOFENCE)
  const liveVehicles: any = useSelector(LIVE_VEHICLES_DATA)
  const activeVehicle: any = useSelector(ACTIVETRACKERVEHICLE)
  const [markerCoords, setMarkerCoords] = useState(liveVehicles);
  const [path, setPath] = useState(selectedGeofence?.path)
  const navigate = useNavigate();
  const mapRef = useRef<google.maps.Map | null>(null);
  const circleRef = useRef(null);
  const polygonRef = useRef(null);
  const [activeTrucks, setActiveTrucks] = useState<any>([])
  const [destination, setDestination] = useState<any>([])
  const __mapMandatoryStyles = { width: '100%', height: '100%' };
  const options = useMemo<MapOptions>(
    () => ({
      mapId: REACT_APP_MAP_ID,
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

  const onLoad = useCallback((map: google.maps.Map) => {
    if (mapRef?.current) {
      mapRef.current = map;
    }
  }, []);

  const fetchDirections = (vehicle: any) => {
    if (!vehicle) return;
    setDestination(vehicle)
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: vehicle?.liveLocation,
        destination: vehicle?.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  console.log('activeVehicle ---- ', activeVehicle?.carLable);

  // var car = "M21.474,377.522V117.138c0-14.469,11.729-26.199,26.199-26.199h260.25c14.469,0,26.198,11.73,26.198,26.199v260.385   c0,4.823-3.909,8.733-8.733,8.733H30.207C25.383,386.256,21.474,382.346,21.474,377.522z M231.634,466.724   c0,30.01-24.329,54.338-54.338,54.338c-30.009,0-54.338-24.328-54.338-54.338c0-30.011,24.329-54.338,54.338-54.338   C207.305,412.386,231.634,436.713,231.634,466.724z M204.464,466.724c0-15.005-12.164-27.169-27.169-27.169   s-27.17,12.164-27.17,27.169s12.165,27.17,27.17,27.17S204.464,481.729,204.464,466.724z M130.495,412.385H8.733   c-4.823,0-8.733,3.91-8.733,8.733v26.495c0,4.823,3.91,8.733,8.733,8.733h97.598C108.879,438.862,117.704,423.418,130.495,412.385z    M515.938,466.724c0,30.01-24.329,54.338-54.338,54.338c-30.01,0-54.338-24.328-54.338-54.338   c0-30.011,24.328-54.338,54.338-54.338C491.609,412.385,515.938,436.713,515.938,466.724z M488.77,466.724   c0-15.005-12.165-27.169-27.17-27.169c-15.006,0-27.169,12.164-27.169,27.169s12.164,27.17,27.169,27.17   S488.77,481.729,488.77,466.724z M612,421.118v26.495c0,4.823-3.91,8.733-8.733,8.733h-70.704   c-5.057-34.683-34.906-61.427-70.961-61.427c-36.062,0-65.912,26.745-70.969,61.427H248.261   c-2.549-17.483-11.373-32.928-24.164-43.961h134.994V162.594c0-9.646,7.82-17.466,17.466-17.466h82.445   c23.214,0,44.911,11.531,57.9,30.77l53.15,78.721c7.796,11.547,11.962,25.161,11.962,39.094v118.672h21.253   C608.09,412.385,612,416.295,612,421.118z M523.408,256.635l-42.501-60.393c-1.636-2.324-4.3-3.707-7.142-3.707H407.47   c-4.822,0-8.733,3.91-8.733,8.733v60.393c0,4.824,3.91,8.733,8.733,8.733h108.798C523.342,270.394,527.48,262.421,523.408,256.635z";
  var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
  // useEffect(() => {
  //   setFlag(!flag)
  //   handleDraw({ path: selectedGeofence.coordinates, type: 'polygon' });
  // }, [selectedLocation])
  // console.log('NEW,,,,',selectedGeofence?.type === 'CIRCLE', selectedGeofence.radius, { lat: selectedGeofence?.center[0], lng: selectedGeofence?.center[0] });
  console.log('44444', circleRef);

  function animatedMove(marker, t, current, moveto) {
    var deltalat = (moveto.lat() - current.lat()) / 100;
    var deltalng = (moveto.lng() - current.lng()) / 100;

    var delay = 10 * t;
    for (var i = 0; i < 100; i++) {
        (function (ind) {
            setTimeout(
                function () {
                    var lat = marker.position.lat();
                    var lng = marker.position.lng();
                    lat += deltalat;
                    lng += deltalng;
                    var latlng = new google.maps.LatLng(lat, lng);
                    marker.setPosition(latlng);
                   // map.setCenter(latlng);
                }, delay * ind
            );
        })(i)
    }

    // setCenter(latlng);
}

  useEffect(() => {
    console.log('Running again...', selectedGeofence);
    if (!selectedGeofence.type) {
      if (polygonRef?.current?.setMap) {
        polygonRef?.current?.setMap(null)
      }
      if (circleRef?.current?.setMap) {
        circleRef?.current?.setMap(null)
      }
    }
    if (polygonRef.current || circleRef.current) {
      if (selectedGeofence?.type === 'POLYGON') {
        if (polygonRef?.current?.setMap) {
          polygonRef?.current?.setMap(null)
        }
        if (circleRef?.current?.setMap) {
          circleRef?.current?.setMap(null)
        }
        polygonRef.current = new window.google.maps.Polygon({
          paths: selectedGeofence?.path,
          fillColor: '#000',
          strokeColor: '#fff',
          strokeOpacity: 0,
          strokeWeight: 0,
          fillOpacity: 0.2,
          editable: false,
          map: mapRef.current,
        });
        // polygonRef?.current?.setPath([]);
      } else if (selectedGeofence?.type === 'CIRCLE') {
        // circleRef?.current?.setMap(null);
        // polygonRef?.current?.setMap(null);
        if (polygonRef?.current?.setMap) {
          polygonRef?.current?.setMap(null)
        }
        if (circleRef?.current?.setMap) {
          circleRef?.current?.setMap(null)
        }
        circleRef.current = new window.google.maps.Circle({
          center: { lat: selectedGeofence?.center[0], lng: selectedGeofence?.center[1] },
          radius: selectedGeofence?.radius,
          fillColor: '#000',
          strokeColor: '#fff',
          strokeOpacity: 0,
          strokeWeight: 0,
          fillOpacity: 0.2,
          editable: false,
          map: mapRef.current,
        });
        // setCircle(newObj)
      }
    }
  }, [selectedGeofence])
  // useEffect(() => {
  //   if (activeVehicle?.carLable) {
  //     const newObj = {
  //       lat: activeVehicle?.latitude,
  //       lng: activeVehicle?.longtitude,
  //     }
  //     console.log('newObj -=----> ', activeVehicle, newObj);

  //     setCenter(newObj)
  //   }

  // }, [activeVehicle?.carLable])
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      setCenter({ lat: position.coords.latitude, lng: position.coords.longitude })
    });
  }, [])
  useEffect(() => {
    if (liveVehicles[0]) {
      console.log('LOG 222');
      setMarkerCoords(liveVehicles)
      // setCenter({ lat: liveVehicles[0].latitude, lng: liveVehicles[0].longtitude })
    }
  }, [liveVehicles])
  return (
    <div className="container">
      <div className="map">
        <GoogleMap
          //@ts-ignore
          ref={mapRef}
          zoom={activeVehicle?.carLable ? 20 : 13}
          center={center}
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

          {markerCoords && (
            <>
              <MarkerClustererF onClusteringBegin={(e) => console.log('RUNNNING>.....', e)}>
                {(clusterer) =>
                  // @ts-ignore
                  markerCoords.map((vehicle) => {
                    const { latitude, longtitude, angle, numberPlate, status, updatedAt, id } = vehicle
                    const liveLocation = { lat: latitude, lng: longtitude }
                    const icon = {
                      path: car,
                      scale: .9,
                      strokeColor: '#4285F4',
                      strokeWeight: .10,
                      fillOpacity: 1,
                      fillColor: '#4285F4',
                      offset: '5%',
                      rotation: angle,
                      anchor: new google.maps.Point(10, 25)
                    };
                    return (
                      (
                        <MarkerF
                          key={latitude}
                          position={liveLocation}
                          clusterer={clusterer}
                          animation={window.google.maps.Animation.DROP}
                          icon={icon}
                          onMouseOver={() => setHoverCard(numberPlate)}
                          onMouseOut={() => setHoverCard("")}
                          onClick={() => {
                            //   const newObj = {
                            //     carLable: numberPlate, 
                            //     status: status, 
                            //     // clickHandler, 
                            //     // alerts, 
                            //     updatedAt
                            // }
                            // navigate('/vehicles');
                            // dispatch(updateActiveTrackVehicle(newObj))
                            // setActiveTrucks(liveLocation?.lat)
                            navigate(`/vehicles/${id}`);

                          }}
                        >
                          {
                            (hoverCard === numberPlate || activeVehicle === numberPlate) && (
                              <InfoWindow key={liveLocation?.lat} position={{ lat: liveLocation?.lat + 0.0001, lng: liveLocation?.lng }}>
                                <div onClick={() => {
                                  // navigate(`/vehicles/${id}`);
                                }} style={{ backgroundColor: 'white', fontSize: 10 }}>
                                  <div className="font-bold mt-2">Model: {numberPlate}</div>
                                  {/* {
                                activeVehicle?.carLable === numberPlate && (
                                  <div>
                                    <div className="font-bold">Status: <span>{activeVehicle?.status}</span></div>
                                    <div></div>
                                  </div>
                                )
                              } */}
                                </div>
                              </InfoWindow>
                            )
                          }

                          {/* <TrafficLayer /> */}
                          {/* {
                            destination?.destination && (
                              <MarkerF
                                position={destination?.destination}
                                animation={window.google.maps.Animation.DROP}
                                // @ts-ignore
                                icon={'https://i.ibb.co/JCCNTjW/destination.png'}
                              />
                            )
                          } */}
                        </MarkerF>
                      )
                    )
                  })
                }
              </MarkerClustererF>
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

          <div>.
            <Polygon
              ref={polygonRef}
              options={{
                fillColor: '#000',
                strokeColor: '#fff',
                strokeOpacity: 0,
                strokeWeight: 0,
                fillOpacity: 0.2,
                editable: false
              }}
              path={path}
            />
          </div>

          <div>
            <Circle
              ref={circleRef}
              center={circle?.center}
              radius={circle?.radius}
              options={{
                fillColor: '#000',
                strokeColor: '#fff',
                strokeOpacity: 0,
                strokeWeight: 0,
                fillOpacity: 0.2,
                editable: false,
              }}
            />
          </div>
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};

const generateHouses = (position: LatLngLiteral) => {
  const _houses: Array<LatLngLiteral> = [];
  for (let i = 0; i < 100; i++) {
    const direction = Math.random() < 0.5 ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
