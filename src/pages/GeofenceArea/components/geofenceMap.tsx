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

export default function GeofenceMap({radius, geofenceData, setGeofenceData, setRadius}) {
    const [flag, setFlag] = useState(false)
    const [shapes, setShapes] = useState<Array<Shape>>([]);
    const [isStatic, setIsStatic] = useState<boolean>(false);
    const [circle, setCircle] = useState(null);
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

    const onLoad = useCallback((map: google.maps.Map) => {
        if (mapRef?.current) {
            mapRef.current = map;
        }
    }, []);

    const handleDraw = useCallback(
        (shape: Shape) => {
            setShapes([...shapes, shape]);
        },
        [shapes]
    );

    const handleOnPolygonComplete = useCallback(
        (polygon: google.maps.Polygon) => {
            if (polygon.getPath() !== null) {
                const polygonPathArray = polygon.getPath().getArray();

                if (polygonPathArray) {
                    const path = polygonPathArray.map(latLngLiteral => {
                        return { lat: latLngLiteral.lat(), lng: latLngLiteral.lng() };
                    });
                    console.log('Polygon Path....', path);
                    setGeofenceData({
                        ...geofenceData,
                        path,
                        type: 'POLYGON',
                        center: [],
                        radius: null,
                    })
                    handleDraw({ path, type: 'polygon' });
                }
            }
        },
        [handleDraw]
    );

    const handleOnCircleComplete = useCallback(
        (circle: google.maps.Circle) => {
            setCircle(circle)
            console.log('CIRCLE....1', circle)
            console.log('CIRCLE....2', circle.getCenter()?.lat())
            console.log('CIRCLE....3', circle.getRadius())
            setRadius(circle.getRadius())
            setGeofenceData({
                ...geofenceData,
                path: [],
                type: 'CIRCLE',
                center: [circle.getCenter()?.lat(), circle.getCenter()?.lng()],
                radius: Math.ceil(circle.getRadius()),
            })
        },
        [handleDraw]
    );

    const renderShapes = useCallback(
        () =>
            shapes.map((shape, idx): JSX.Element | null =>
                shape.type === 'polygon' ? (
                    <div>
                        <Polygon options={{
                            fillColor: '#4285F4',
                            strokeColor: '#fff',
                            strokeOpacity: 0,
                            strokeWeight: 0,
                            fillOpacity: 0.3,
                            editable: true
                        }} key={idx} path={shape.path.map(latLng => latLng)} />
                    </div>
                ) : null
            ),
        [shapes]
    );

    new window.google.maps.drawing.DrawingManager({
        drawingMode: window.google?.maps?.drawing?.OverlayType?.CIRCLE
    })

    const handleOverlayComplete = (e) => {
        console.log('RINNING E -->', e);
        new window.google.maps.drawing.DrawingManager({
            drawingMode: null
        })
        // this.setDrawingMode(null);
        // this.setOptions({drawingControlOptions: {drawingModes: [] }}); 
    };

    useEffect(() => {
        if(circle?.setRadius) {
            console.log('WWWW...',radius);
            circle?.setRadius(radius);
        }
    },[radius])
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
                    center={center}
                    mapContainerClassName="map-container"
                    mapContainerStyle={__mapMandatoryStyles}
                    options={options}
                    onLoad={onLoad}
                >
                    {
                        flag && (
                            <DrawingManager
                                options={{
                                    drawingControl: true,
                                    drawingControlOptions: {
                                        position: window?.google.maps.ControlPosition.TOP_CENTER,
                                        drawingModes: [
                                            window.google?.maps?.drawing?.OverlayType?.POLYGON,
                                            window.google?.maps?.drawing?.OverlayType?.CIRCLE
                                        ],
                                    },
                                    polygonOptions: {
                                        fillColor: '#1E90FF',
                                        strokeColor: '#fff',
                                        strokeWeight: 0,
                                        fillOpacity: 0.3,
                                        editable: true
                                    },
                                    circleOptions: {
                                        fillColor: `#1E90FF`,
                                        fillOpacity: 0.3,
                                        strokeWeight: 0,
                                        clickable: false,
                                        radius: radius,
                                        editable: true,
                                        zIndex: 1
                                    }
                                }}
                                onPolygonComplete={handleOnPolygonComplete}
                                onCircleComplete={handleOnCircleComplete}
                                onOverlayComplete={handleOverlayComplete}
                            />
                        )
                    }
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
