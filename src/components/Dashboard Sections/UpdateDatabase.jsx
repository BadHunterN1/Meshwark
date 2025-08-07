import React, { useState, useEffect } from 'react';
import { fetchDocument } from '../../utils/http';

export default function UpdateDatabase() {
    const [destinationsData, setDestinationsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedDocument, setSelectedDocument] = useState('mansoura');

    useEffect(() => {
        loadDestinationsData();
    }, [selectedDocument]);

    const loadDestinationsData = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await fetchDocument('destinations', selectedDocument);
            setDestinationsData(data);
        } catch (err) {
            setError('فشل في تحميل البيانات');
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentChange = e => {
        setSelectedDocument(e.target.value);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            لوحة إدارة قاعدة البيانات
                        </h1>
                        <button
                            onClick={loadDestinationsData}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            تحديث البيانات
                        </button>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
                            <p className="font-semibold">خطأ:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            اختر المستند:
                        </label>
                        <select
                            value={selectedDocument}
                            onChange={handleDocumentChange}
                            className="w-full md:w-64 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="mansoura">المنصورة</option>
                            {/* Add more document options as needed */}
                        </select>
                    </div>

                    {destinationsData && (
                        <div className="space-y-6">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    معلومات المستند
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <span className="font-medium text-gray-600">
                                            اسم المستند:
                                        </span>
                                        <span className="ml-2 text-gray-800">
                                            {selectedDocument}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">
                                            عدد المسارات:
                                        </span>
                                        <span className="ml-2 text-gray-800">
                                            {destinationsData?.microbuses
                                                ?.destinations?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                    المسارات المتاحة
                                </h2>
                                {destinationsData?.microbuses?.destinations ? (
                                    <div className="space-y-3">
                                        {destinationsData.microbuses.destinations.map(
                                            (station, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white rounded-lg p-4 border border-gray-200"
                                                >
                                                    <div className="flex justify-between items-start">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold text-gray-800">
                                                                {
                                                                    station
                                                                        .fromTo
                                                                        ?.from
                                                                        ?.name
                                                                }{' '}
                                                                →{' '}
                                                                {
                                                                    station
                                                                        .fromTo
                                                                        ?.to
                                                                        ?.name
                                                                }
                                                            </h3>
                                                            <div className="text-sm text-gray-600 mt-1">
                                                                <span>
                                                                    المسافة:{' '}
                                                                    {
                                                                        station.distance
                                                                    }{' '}
                                                                    كم
                                                                </span>
                                                                <span className="mx-2">
                                                                    |
                                                                </span>
                                                                <span>
                                                                    المدة:{' '}
                                                                    {
                                                                        station.duration
                                                                    }{' '}
                                                                    دقيقة
                                                                </span>
                                                                <span className="mx-2">
                                                                    |
                                                                </span>
                                                                <span>
                                                                    التقييم:{' '}
                                                                    {
                                                                        station.rating
                                                                    }
                                                                </span>
                                                            </div>
                                                            {station.crossStations &&
                                                                station
                                                                    .crossStations
                                                                    .length >
                                                                    0 && (
                                                                    <div className="text-sm text-gray-500 mt-1">
                                                                        <span>
                                                                            المحطات
                                                                            الوسيطة:{' '}
                                                                        </span>
                                                                        {station.crossStations.map(
                                                                            (
                                                                                cross,
                                                                                idx
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        idx
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        cross
                                                                                            .station
                                                                                            ?.name
                                                                                    }
                                                                                    {idx <
                                                                                    station
                                                                                        .crossStations
                                                                                        .length -
                                                                                        1
                                                                                        ? '، '
                                                                                        : ''}
                                                                                </span>
                                                                            )
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            ID:{' '}
                                                            {
                                                                station.destinationId
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-gray-500">
                                        لا توجد مسارات متاحة
                                    </p>
                                )}
                            </div>

                            <div className="bg-blue-50 rounded-lg p-4">
                                <h2 className="text-lg font-semibold text-blue-800 mb-4">
                                    إحصائيات سريعة
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {destinationsData?.microbuses
                                                ?.destinations?.length || 0}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            إجمالي المسارات
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {destinationsData?.microbuses?.destinations?.reduce(
                                                (sum, station) =>
                                                    sum +
                                                    (station.crossStations
                                                        ?.length || 0),
                                                0
                                            ) || 0}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            إجمالي المحطات الوسيطة
                                        </div>
                                    </div>
                                    <div className="bg-white rounded-lg p-3 text-center">
                                        <div className="text-2xl font-bold text-purple-600">
                                            {(
                                                destinationsData?.microbuses?.destinations?.reduce(
                                                    (sum, station) =>
                                                        sum + station.rating,
                                                    0
                                                ) /
                                                (destinationsData?.microbuses
                                                    ?.destinations?.length || 1)
                                            ).toFixed(1) || 0}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            متوسط التقييم
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
