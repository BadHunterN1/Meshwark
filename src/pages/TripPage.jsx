import { Outlet, useParams } from 'react-router-dom';
import TripDetails from '../components/Trip Sections/TripDetails';
import TripSummary from '../components/Trip Sections/TripSummary';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../utils/http';
import MissingRouteUserForm from '../components/Trip Sections/MissingRouteUserForm';
export default function TripPage() {
    const { from, to } = useParams();

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

    const selectedStation = (stations || []).find(
        stationObj =>
            stationObj?.from?.name === from && stationObj?.to?.name === to
    );

    const isStationSuspended =
        selectedStation && selectedStation.available === false;

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
                    isStationSuspended ? (
                        <div className="container py-8">
                            <div className="text-center">
                                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-2xl mx-auto">
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg
                                            className="w-8 h-8 text-red-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-2xl font-bold text-red-800 mb-4">
                                        المسار معلق مؤقتاً
                                    </h2>
                                    <p className="text-red-700 mb-6">
                                        عذراً، المسار من{' '}
                                        <span className="font-semibold">
                                            {selectedStation.from.name}
                                        </span>{' '}
                                        إلى{' '}
                                        <span className="font-semibold">
                                            {selectedStation.to.name}
                                        </span>{' '}
                                        معلق حالياً وغير متاح للاستخدام.
                                    </p>
                                    <div className="bg-white rounded-lg p-4 mb-6">
                                        <h3 className="font-semibold text-gray-800 mb-2">
                                            تفاصيل المسار المعلق:
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                            <div className="text-center">
                                                <div className="font-medium text-gray-600">
                                                    المدة
                                                </div>
                                                <div className="text-gray-800">
                                                    {selectedStation.duration}{' '}
                                                    دقيقة
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-gray-600">
                                                    المسافة
                                                </div>
                                                <div className="text-gray-800">
                                                    {selectedStation.distance}{' '}
                                                    كم
                                                </div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-medium text-gray-600">
                                                    السعر
                                                </div>
                                                <div className="text-gray-800">
                                                    {selectedStation.totalFee}{' '}
                                                    ج.م
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-gray-600">
                                            يمكنك البحث عن مسارات بديلة أو
                                            العودة لاحقاً.
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                            <button
                                                onClick={() =>
                                                    window.history.back()
                                                }
                                                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                                            >
                                                العودة للصفحة السابقة
                                            </button>
                                            <button
                                                onClick={() =>
                                                    (window.location.href = '/')
                                                }
                                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                البحث عن مسار آخر
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
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
                    )
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
