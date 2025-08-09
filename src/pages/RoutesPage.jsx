import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, BanIcon, Clock, MapPin, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDocument } from '../utils/http';
import MotionFadeIn from '../components/UI/MotionFadeIn';

export default function RoutesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const {
        data: destinationsData,
        isLoading: destinationsLoading,
        error: destinationsDataError,
    } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => fetchDocument('destinations', 'mansoura'),
    });

    if (destinationsLoading) {
        return (
            <p className="h-screen text-center flex justify-center items-center text-6xl animate-pulse">
                جاري التحميل
            </p>
        );
    } else if (destinationsDataError) {
        return (
            <p className="h-screen flex items-center justify-center flex-col text-center text-red-600 text-3xl sm:text-4xl lg:text-6xl">
                <BanIcon size={100} />
                نعتذر، حدث خلل غير متوقع أثناء محاولة تحميل الصفحة. يرجى
                المحاولة مرة أخرى لاحقًا.
            </p>
        );
    }
    console.log(destinationsData.microbuses.destinations);
    const stations = destinationsData.microbuses.destinations;

    // Filter stations based on search query
    const filteredStations = stations.filter(stationObj => {
        if (!searchQuery.trim()) return true;

        const fromName = stationObj.from?.name || '';
        const toName = stationObj.to?.name || '';
        const description = `اذهب من محطة ${fromName} الي محطة ${toName}`;

        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
            fromName.toLowerCase().includes(searchLower) ||
            toName.toLowerCase().includes(searchLower) ||
            description.toLowerCase().includes(searchLower);

        return matchesSearch;
    });

    return (
        <div className="bg-gradient-to-tr from-blue-50 via-white to-green-50 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <MotionFadeIn className="text-center mb-20">
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-4 p-2">
                        اكتشف أفضل المسارات
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
                        اختر من مئات المسارات المتاحة في المنصورة وضواحيها. نقدم
                        لك أفضل الطرق وأسرعها مع معلومات دقيقة ومحدثة
                    </p>
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="ابحث عن مسار من المنصورة إلى..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full px-12 py-4 rounded-xl bg-white border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg"
                            />
                        </div>
                    </div>
                </MotionFadeIn>

                <MotionFadeIn>
                    {filteredStations.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                            {filteredStations.map((stationObj, index) => {
                                console.log(stationObj.to);
                                const routeNumber = index + 1;

                                const handleNavigation = () => {
                                    navigate(
                                        `/trip/${stationObj.from.name}/${stationObj.to.name}`
                                    );
                                };

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col justify-between bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                                    >
                                        <div className="p-6 border-b border-gray-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                                                        <MapPin className="w-4 h-4 text-white" />
                                                    </div>
                                                    <span className="text-sm text-gray-500">
                                                        مسار {routeNumber}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-medium">
                                                        {stationObj.rating}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-semibold text-gray-800">
                                                        {stationObj.from.name}
                                                    </span>
                                                    <ArrowLeft className="w-4 h-4 text-gray-400" />
                                                    <span className="font-semibold text-gray-800">
                                                        {stationObj.to.name}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    اذهب من محطة{' '}
                                                    {stationObj.from.name} الي
                                                    محطة {stationObj.to.name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-6 space-y-4">
                                            <div className="grid grid-cols-3 gap-4 text-center">
                                                <div className="space-y-1">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto">
                                                        <Clock className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-800">
                                                        {stationObj.duration}{' '}
                                                        دقيقة
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        المدة
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mx-auto">
                                                        <MapPin className="w-4 h-4 text-white" />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-800">
                                                        {stationObj.distance} كم
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        المسافة
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mx-auto">
                                                        <div className="text-white font-bold text-sm">
                                                            ج
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-800">
                                                        {stationObj.totalFee}
                                                        ج.م
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        السعر
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                onClick={handleNavigation}
                                                className="w-full cursor-pointer bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                            >
                                                عرض التفاصيل
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    لم يتم العثور على نتائج
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    لا توجد مسارات تطابق البحث: "{searchQuery}"
                                </p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="text-blue-600 hover:text-blue-700 font-medium"
                                >
                                    مسح البحث
                                </button>
                            </div>
                        </div>
                    )}
                </MotionFadeIn>

                <MotionFadeIn>
                    <div className="text-center mt-16 bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                            لم تجد المسار الذي تبحث عنه؟
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            استخدم محرك البحث في الصفحة الرئيسية للعثور على أي
                            مسار في المنصورة
                        </p>
                        <Link
                            to="/"
                            className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                            العودة للصفحة الرئيسية
                        </Link>
                    </div>
                </MotionFadeIn>
            </div>
        </div>
    );
}
