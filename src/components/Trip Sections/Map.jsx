import { useEffect, useState } from 'react';
import {
    APIProvider,
    Map,
    InfoWindow,
    useMap,
    useMapsLibrary,
} from '@vis.gl/react-google-maps';
import { useParams } from 'react-router-dom';

export default function GoogleMap() {
    const { cLatitude, cLongitude, nLatitude, nLongitude, index } = useParams();
    const [center, setCenter] = useState({
        lat: 31.0425,
        lng: 31.38,
    });
    const [hasUserLocation, setHasUserLocation] = useState(false);

    useEffect(() => {
        let watchId;

        if ('geolocation' in navigator) {
            watchId = navigator.geolocation.watchPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    const newPosition = { lat: latitude, lng: longitude };

                    if (!hasUserLocation) {
                        setCenter(newPosition);
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
                    defaultCenter={center}
                    mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID}
                    defaultZoom={20}
                    gestureHandling={'greedy'}
                    className="w-full h-full"
                >
                    <Directions
                        origin={
                            Number(index) === 1
                                ? center
                                : {
                                      lat: Number(cLatitude),
                                      lng: Number(cLongitude),
                                  }
                        }
                        destination={
                            Number(index) === 1
                                ? {
                                      lat: Number(cLatitude),
                                      lng: Number(cLongitude),
                                  }
                                : {
                                      lat: Number(nLatitude),
                                      lng: Number(nLongitude),
                                  }
                        }
                    />
                </Map>
            </div>
        </APIProvider>
    );
}

function Directions({ origin, destination }) {
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

        const service = new routesLibrary.DirectionsService();
        const renderer = new routesLibrary.DirectionsRenderer({ map });

        setDirectionService(service);
        setDirectionRenderer(renderer);

        return () => {
            renderer.setMap(null);
        };
    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionRenderer || !directionService) return;

        directionRenderer.set('directions', null);

        directionService
            .route({
                origin: origin,
                destination: destination,
                travelMode: routesLibrary.TravelMode.DRIVING,
                provideRouteAlternatives: true,
            })
            .then(response => {
                directionRenderer.setDirections(response);
                setRoutes(response.routes);
            });
    }, [
        directionService,
        directionRenderer,
        routesLibrary,
        origin,
        destination,
        map,
    ]);

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
