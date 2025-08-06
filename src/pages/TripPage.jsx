import { useParams } from 'react-router-dom';
import TripDetails from '../components/Trip Sections/TripDetails';
import TripSummary from '../components/Trip Sections/TripSummary';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../utils/http';
export default function TripPage() {
    const { from, to } = useParams();
    console.log(`${from} ${to}`);

    const {
        data: destinationsData,
        // isLoading: governoratesLoading,
        // error: destinationsDataError,
    } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => fetchDocument('destinations', 'mansoura'),
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
        <section>
            <div>
                {selectedStation ? (
                    <>
                        <TripSummary
                            from={selectedStation.fromTo?.from}
                            to={selectedStation.fromTo?.to}
                            duration={selectedStation.duration || 0}
                            distance={selectedStation.distance || 0}
                            fee={fee || 0}
                        />
                        <TripDetails
                            from={selectedStation.fromTo?.from.name}
                            to={selectedStation.fromTo?.to.name}
                        />
                    </>
                ) : (
                    <div className="container py-8">
                        <div className="text-center text-gray-600">
                            <p>لم يتم العثور على المسار المطلوب</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
