import { Outlet, useParams } from 'react-router-dom';
import TripDetails from '../components/Trip Sections/TripDetails';
import TripSummary from '../components/Trip Sections/TripSummary';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../utils/http';
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
    console.log(stations);

    const selectedStation = (stations || []).find(
        stationObj =>
            stationObj?.from?.name === from && stationObj?.to?.name === to
    );

    console.log(selectedStation);

    return (
        <section className="p-4">
            <title>
                {selectedStation
                    ? `رحلة ${selectedStation.from.name} إلى ${selectedStation.to.name} | مشوارك`
                    : `تفاصيل الرحلة | مشوارك`}
            </title>
            <meta
                name="description"
                content={
                    selectedStation
                        ? `المسار من ${selectedStation.from.name} إلى ${selectedStation.to.name}، المدة ${selectedStation.duration} دقيقة، المسافة ${selectedStation.distance} كم، والسعر ${selectedStation.totalFee} ج.م.`
                        : 'تفاصيل الرحلة في مشوارك.'
                }
            />
            <Outlet />
            <div>
                {!destinationsLoading && selectedStation ? (
                    <>
                        <TripSummary
                            from={selectedStation.from}
                            to={selectedStation.to}
                            duration={selectedStation.duration}
                            distance={selectedStation.distance}
                            fee={selectedStation.totalFee}
                            id={selectedStation.destinationId}
                        />
                        <TripDetails
                            from={selectedStation.from.name}
                            to={selectedStation.to.name}
                        />
                    </>
                ) : destinationsError ||
                  (!selectedStation && !destinationsLoading) ? (
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
