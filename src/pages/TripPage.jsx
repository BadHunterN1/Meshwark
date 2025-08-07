import { Outlet, useParams } from 'react-router-dom';
import TripDetails from '../components/Trip Sections/TripDetails';
import TripSummary from '../components/Trip Sections/TripSummary';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../utils/http';
import MissingRouteForm from '../components/Dashboard Sections/MissingRouteForm';
import MissingRouteUserForm from '../components/Trip Sections/MissingRouteUserForm';
export default function TripPage() {
    const { from, to } = useParams();
    console.log(`${from} ${to}`);

    const {
        data: destinationsData,
        isLoading: destinationsLoading,
        error: destinationsError,
    } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => fetchDocument('destinations', 'mansoura'),
        retry: 3,
    });

    const stations = destinationsData?.microbuses?.destinations;
    const fee = destinationsData?.microbuses.fee;

    const selectedStation = (stations || []).find(
        stationObj =>
            stationObj?.station?.fromTo?.from?.name === from &&
            stationObj?.station?.fromTo?.to?.name === to
    )?.station;

    console.log(selectedStation);

    return (
        <section className="p-4">
            <Outlet context={{ selectedStation }} />
            <div>
                {!destinationsLoading && selectedStation ? (
                    <>
                        <TripSummary
                            from={selectedStation.fromTo?.from}
                            to={selectedStation.fromTo?.to}
                            duration={selectedStation.duration}
                            distance={selectedStation.distance}
                            fee={fee}
                            id={selectedStation.destinationId}
                        />
                        <TripDetails
                            from={selectedStation.fromTo?.from.name}
                            to={selectedStation.fromTo?.to.name}
                        />
                    </>
                ) : destinationsError || !selectedStation ? (
                    <div className="container py-8">
                        <div className="text-center text-gray-600">
                            <p className="text-4xl">
                                لم يتم العثور على المسار المطلوب
                            </p>
                            <MissingRouteUserForm
                                fromDefault={from}
                                toDefault={to}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="container h-screen w-full text-4xl py-8">
                        <div className="text-center animate-pulse text-gray-600">
                            <p>جاري تحميل المسار الرجاء الانتظار...</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
