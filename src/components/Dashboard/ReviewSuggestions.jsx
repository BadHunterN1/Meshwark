import React, { useEffect, useState } from 'react';
import {
    fetchUsersRoutes,
    addStationToDestinations,
    addStationDetails,
    removeStationFromUsersRoutes,
} from '../../utils/http';
import { Check, X } from 'lucide-react';

export default function ReviewSuggestions() {
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [opLoadingId, setOpLoadingId] = useState(null);

    const USERS_ROUTES_DOC = 'routes';
    const DESTINATIONS_DOC = 'mansoura';

    const load = async () => {
        try {
            setLoading(true);
            setError('');
            const data = await fetchUsersRoutes(USERS_ROUTES_DOC);
            console.log(data.microbuses?.destinations);

            setSuggestions(data?.microbuses?.destinations || []);
        } catch (err) {
            console.error(err);
            setError('فشل في تحميل اقتراحات المستخدمين');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const acceptSuggestion = async station => {
        try {
            setOpLoadingId(station.destinationId);
            await addStationToDestinations(DESTINATIONS_DOC, station);
            await addStationDetails('station-details', station);
            await removeStationFromUsersRoutes(
                USERS_ROUTES_DOC,
                station.destinationId
            );
            setSuggestions(prev =>
                prev.filter(
                    s =>
                        String(s.destinationId) !==
                        String(station.destinationId)
                )
            );
        } catch (err) {
            console.error(err);
            setError('تعذر قبول الاقتراح');
        } finally {
            setOpLoadingId(null);
        }
    };

    const declineSuggestion = async station => {
        try {
            setOpLoadingId(station.destinationId);
            await removeStationFromUsersRoutes(
                USERS_ROUTES_DOC,
                station.destinationId
            );
            setSuggestions(prev =>
                prev.filter(
                    s =>
                        String(s.destinationId) !==
                        String(station.destinationId)
                )
            );
        } catch (err) {
            console.error(err);
            setError('تعذر رفض الاقتراح');
        } finally {
            setOpLoadingId(null);
        }
    };

    if (loading) return <div className="p-6">جاري التحميل...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">اقتراحات المستخدمين</h2>
                    <button
                        onClick={load}
                        className="px-3 py-2 rounded bg-blue-600 text-white"
                    >
                        تحديث
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 mb-4">
                        {error}
                    </div>
                )}

                {suggestions.length === 0 ? (
                    <p className="text-gray-500">لا توجد اقتراحات حالياً</p>
                ) : (
                    <div className="space-y-3">
                        {suggestions.map(station => (
                            <div
                                key={station.destinationId}
                                className="border rounded-lg p-4 flex items-start justify-between"
                            >
                                <div className="flex-1">
                                    <div className="font-semibold text-gray-800">
                                        {station?.from?.name} →{' '}
                                        {station?.to?.name}
                                    </div>
                                    <div className="text-sm text-gray-600 mt-1">
                                        <span>
                                            المسافة {station.distance} كم
                                        </span>
                                        <span className="mx-2">|</span>
                                        <span>
                                            المدة {station.duration} دقيقة
                                        </span>
                                    </div>
                                    {station.crossStations?.length > 0 && (
                                        <div className="text-xs text-gray-500 mt-1">
                                            محطات وسيطة:{' '}
                                            {station.crossStations
                                                .map(cs => cs?.station?.name)
                                                .filter(Boolean)
                                                .join('، ')}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() =>
                                            declineSuggestion(station)
                                        }
                                        disabled={
                                            opLoadingId ===
                                            station.destinationId
                                        }
                                        className="p-2 rounded bg-red-600 text-white disabled:opacity-60"
                                        title="رفض"
                                    >
                                        <X className="size-4" />
                                    </button>
                                    <button
                                        onClick={() =>
                                            acceptSuggestion(station)
                                        }
                                        disabled={
                                            opLoadingId ===
                                            station.destinationId
                                        }
                                        className="p-2 rounded bg-green-600 text-white disabled:opacity-60"
                                        title="قبول"
                                    >
                                        <Check className="size-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
