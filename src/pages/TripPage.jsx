import { Outlet } from 'react-router-dom';
import TripDetails from '../components/Trip Sections/TripDetails';
import TripSummary from '../components/Trip Sections/TripSummary';
import AddRoute from '../components/Dashboard/AddRoute';
import { useContext } from 'react';
import { PathContext } from '../Context/PathContext';

export default function TripPage() {
    const { selectedPath } = useContext(PathContext);
    console.log(selectedPath)

    return (
        <section className="p-4">
            <Outlet context={{ selectedPath }} />
            <div>
                {selectedPath ? (
                    <>
                        <TripSummary
                            from={{ name: selectedPath.from }}
                            to={{ name: selectedPath.to }}
                            duration={selectedPath.estimatedTime}
                            distance={selectedPath.distance}
                            fee={selectedPath.cost}
                            id={selectedPath.id}
                            stops={selectedPath.stops}
                            category={selectedPath.category}
                        />
                        <TripDetails
                            from={selectedPath.from}
                            to={selectedPath.to}
                            crossStations={selectedPath.stops}
                            num={selectedPath.cost}
                        />
                    </>
                ) : (
                    <div className="container py-8">
                        <div className="text-center text-gray-600">
                            <p className="text-4xl">
                                لم يتم العثور على المسار المطلوب
                            </p>
                            <AddRoute />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
