import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
    fetchUsersRoutes,
    addStationToDestinations,
    addStationDetails,
    removeStationFromUsersRoutes,
} from '../../utils/http';
import { Check, X } from 'lucide-react';
import { queryClient } from '../../config/query';

export default function ReviewSuggestions() {
    const USERS_ROUTES_DOC = 'routes';
    const DESTINATIONS_DOC = 'mansoura';

    // Query for fetching user suggestions
    const {
        data: suggestionsData,
        isLoading: loading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['user-suggestions', USERS_ROUTES_DOC],
        queryFn: () => fetchUsersRoutes(USERS_ROUTES_DOC),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });

    // Mutation for accepting a suggestion
    const acceptSuggestionMutation = useMutation({
        mutationFn: async station => {
            await addStationToDestinations(DESTINATIONS_DOC, station);
            await addStationDetails('station-details', station);
            await removeStationFromUsersRoutes(
                USERS_ROUTES_DOC,
                station.destinationId
            );
        },
        onSuccess: () => {
            // Invalidate and refetch the suggestions query
            queryClient.invalidateQueries({
                queryKey: ['user-suggestions', USERS_ROUTES_DOC],
            });
        },
        onError: error => {
            console.error('Failed to accept suggestion', error);
            alert('تعذر قبول الاقتراح');
        },
    });

    // Mutation for declining a suggestion
    const declineSuggestionMutation = useMutation({
        mutationFn: station =>
            removeStationFromUsersRoutes(
                USERS_ROUTES_DOC,
                station.destinationId
            ),
        onSuccess: () => {
            // Invalidate and refetch the suggestions query
            queryClient.invalidateQueries({
                queryKey: ['user-suggestions', USERS_ROUTES_DOC],
            });
        },
        onError: error => {
            console.error('Failed to decline suggestion', error);
            alert('تعذر رفض الاقتراح');
        },
    });

    const acceptSuggestion = station => {
        acceptSuggestionMutation.mutate(station);
    };

    const declineSuggestion = station => {
        declineSuggestionMutation.mutate(station);
    };

    if (loading) return <div className="p-6">جاري التحميل...</div>;

    const suggestions = suggestionsData?.microbuses?.destinations || [];

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">اقتراحات المستخدمين</h2>
                    <button
                        onClick={() => refetch()}
                        className="px-3 cursor-pointer py-2 rounded bg-blue-600 text-white"
                    >
                        تحديث
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-3 mb-4">
                        {error.message || 'فشل في تحميل اقتراحات المستخدمين'}
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
                                            declineSuggestionMutation.isPending ||
                                            acceptSuggestionMutation.isPending
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
                                            acceptSuggestionMutation.isPending ||
                                            declineSuggestionMutation.isPending
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
