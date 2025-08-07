import { useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow,
    useMap,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { useParams, useOutletContext } from 'react-router-dom';

export default function GoogleMap() {
    const { from } = useParams();
    const { selectedStation } = useOutletContext();
    console.log('Outlet context:', selectedStation);
    const [open, setOpen] = useState(false);
    const [center, setCenter] = useState({
        lat: 31.0425,
        lng: 31.38,
    });
    const [hasUserLocation, setHasUserLocation] = useState(false);
    const [shouldCenter, setShouldCenter] = useState(false);

    useEffect(() => {
        let watchId;

        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const newPosition = { lat: latitude, lng: longitude };

                    if (!hasUserLocation) {
                        setCenter(newPosition);
                        setShouldCenter(true);
                        setTimeout(() => setShouldCenter(false), 300);
                    }

                    setHasUserLocation(true);
                },
                error => {
                    console.error('Geolocation error:', error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0,
                }
            );
        }

        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId);
            }
        };
    }, [hasUserLocation]);

    return (
        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <div className="h-screen w-full relative">
                <Map
                    {...(shouldCenter
                        ? { center: center }
                        : { defaultCenter: center })}
                    mapId={'1b9264908eb0cb167d4824e0'}
                    defaultZoom={20}
                    gestureHandling={'greedy'}
                    className="w-full h-full"
                >
                    {selectedStation?.crossStations?.map(
                        (stationObj, index) => {
                            const lat = stationObj.station.coords?.latitude;
                            const lng = stationObj.station.coords?.longitude;
                            {
                                return (
                                    <AdvancedMarker
                                        key={index}
                                        position={{ lat, lng }}
                                    >
                                        <Pin
                                            background={'#FF6B35'}
                                            borderColor={'#E55A2B'}
                                            glyphColor={'white'}
                                        />
                                    </AdvancedMarker>
                                );
                            }
                        }
                    )}
                    {selectedStation?.endCoords?.latitude &&
                        selectedStation?.endCoords?.longitude && (
                            <AdvancedMarker
                                position={{
                                    lat: selectedStation.endCoords.latitude,
                                    lng: selectedStation.endCoords.longitude,
                                }}
                            >
                                <Pin
                                    background={'#2196F3'}
                                    borderColor={'#1976D2'}
                                    glyphColor={'white'}
                                />
                            </AdvancedMarker>
                        )}

                    {open && (
                        <InfoWindow
                            position={center}
                            onCloseClick={() => setOpen(false)}
                        >
                            <p>Your current location</p>
                        </InfoWindow>
                    )}
                    {selectedStation?.startCoords?.latitude &&
                        selectedStation?.startCoords?.longitude && (
                            <>
                                <Directions
                                    user={center}
                                    from={from}
                                    destination={{
                                        lat: selectedStation.startCoords
                                            .latitude,
                                        lng: selectedStation.startCoords
                                            .longitude,
                                    }}
                                />
                                <Directions
                                    user={{
                                        lat: selectedStation.startCoords
                                            .latitude,
                                        lng: selectedStation.startCoords
                                            .longitude,
                                    }}
                                    from={from}
                                    destination={{
                                        lat: selectedStation.endCoords.latitude,
                                        lng: selectedStation.endCoords
                                            .longitude,
                                    }}
                                />
                            </>
                        )}
                </Map>
            </div>
        </APIProvider>
    );
}

function Directions({ user, destination, from }) {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionService, setDirectionService] = useState();
    const [directionRenderer, setDirectionRenderer] = useState();
    const [routes, setRoutes] = useState();
    const [routeIndex, setRouteIndex] = useState(0);
    const selected = routes?.[routeIndex];
    const leg = selected?.legs[0];

    useEffect(() => {
        if (!routesLibrary || !map) return;

        setDirectionService(new routesLibrary.DirectionsService());
        setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionRenderer || !directionService) return;

        directionService
            .route({
                origin: user,
                destination: destination,
                travelMode: routesLibrary.TravelMode.WALKING,
                provideRouteAlternatives: true,
            })
            .then(response => {
                directionRenderer.setDirections(response);
                setRoutes(response.routes);
            });
    }, [directionService, directionRenderer]);

    useEffect(() => {
        if (!directionRenderer) return;

        directionRenderer.setRouteIndex(routeIndex);
    }, [routeIndex, directionRenderer]);

    if (!leg) return null;
    return (
        <div className="directions absolute top-2.5 left-2.5 bg-white p-2.5 rounded-lg shadow-lg max-w-[300px] z-[1000]">
            <h2>الطريق إلى المحطة</h2>
            <div className="mb-2.5">
                <p className="font-bold text-green-500">📍 موقعك</p>
                <p className="text-xs text-gray-500">
                    {leg.start_address?.split(',')[0]}
                </p>
            </div>
            <div className="mb-2.5">
                <p className="font-bold text-blue-500">🎯 محطة الركوب</p>
                <p className="text-sm text-gray-500">{from}</p>
            </div>
            <p>مسافة: {leg.distance?.text}</p>
            <p>مدة: {leg.duration?.text} سيرا على الأقدام</p>
            {routes.length > 1 && (
                <>
                    <h3>Other Routes</h3>
                    <ul className="list-none p-0">
                        {routes.map((route, index) => (
                            <li key={route.summary} className="mb-1">
                                <button
                                    onClick={() => setRouteIndex(index)}
                                    className={`px-2.5 py-1.5 border border-gray-300 rounded cursor-pointer ${
                                        index === routeIndex
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-black'
                                    }`}
                                >
                                    {route.summary}
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
