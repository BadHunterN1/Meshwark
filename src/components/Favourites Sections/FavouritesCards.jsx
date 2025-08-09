import { ArrowLeft, Clock, MapPin, Search, Bookmark } from 'lucide-react';
import MotionFadeIn from '../UI/MotionFadeIn';
import { useState, useEffect } from 'react';

export default function FavouriteCards() {
    const [searchQuery, setSearchQuery] = useState('');
    const [favourites, setFavourites] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('favourites')) || [];
        setFavourites(saved);
    }, []);

    const filteredRoutes = favourites.filter(route => {
        const matchesSearch =
            route.from?.name?.includes(searchQuery) ||
            route.to?.name?.includes(searchQuery) ||
            route.description?.includes(searchQuery);
        return matchesSearch;
    });

    const removeFavourite = id => {
        const updated = favourites.filter(route => route.id !== id);
        setFavourites(updated);
        localStorage.setItem('favourites', JSON.stringify(updated));
    };

    return (
        <div className="bg-gradient-to-tr from-blue-50 via-white to-green-50 min-h-screen text-base md:text-lg">
            <div className="container mx-auto px-6 py-20">
                <div className="text-center mb-24">
                    <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-6 p-4">
                        قائمة المفضلة
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
                        محطاتك المحفوظة للوصول السريع
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <Search className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                            <input
                                type="text"
                                placeholder="ابحث عن مسارك المفضل..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="w-full px-14 py-5 rounded-2xl bg-white border border-gray-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 shadow-lg text-lg"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto mb-20">
                    {filteredRoutes.length > 0 ? (
                        filteredRoutes.map((route, index) => (
                            <MotionFadeIn
                                delay={0.15 + index * 0.2}
                                key={route.id}
                                className="flex flex-col justify-between bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                            >
                                <div className="p-7 border-b border-gray-100">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                                                <MapPin className="w-5 h-5 text-white" />
                                            </div>
                                            <span className="text-base text-gray-500 font-medium">
                                                مسار {route.id}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() =>
                                                removeFavourite(route.id)
                                            }
                                            className="transition-all duration-300 transform hover:scale-110 hover:rotate-1"
                                        >
                                            <Bookmark
                                                className="w-7 h-7"
                                                fill="hsl(213, 98%, 60%)"
                                                stroke="hsl(213, 98%, 60%)"
                                            />
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-lg font-semibold">
                                            <span className="text-gray-800">
                                                {route.from?.name}
                                            </span>
                                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                                            <span className="text-gray-800">
                                                {route.to?.name}
                                            </span>
                                        </div>
                                        {route.description && (
                                            <p className="text-base text-gray-600 leading-relaxed">
                                                {route.description}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="p-7 space-y-5">
                                    <div className="grid grid-cols-3 gap-5 text-center">
                                        <div className="space-y-1">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto">
                                                <Clock className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="text-base font-medium text-gray-800">
                                                {route.duration}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                المدة
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto">
                                                <MapPin className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="text-base font-medium text-gray-800">
                                                {route.distance}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                المسافة
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto">
                                                <div className="text-white font-bold text-base">
                                                    ج
                                                </div>
                                            </div>
                                            <div className="text-base font-medium text-gray-800">
                                                {route.fee}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                السعر
                                            </div>
                                        </div>
                                    </div>

                                    <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 rounded-2xl cursor-pointer text-lg font-semibold hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                        عرض التفاصيل
                                    </button>
                                </div>
                            </MotionFadeIn>
                        ))
                    ) : (
                        <p className="text-center text-gray-500 col-span-3">
                            لا توجد مفضلات حالياً
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
