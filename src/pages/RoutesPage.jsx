import { ArrowRight, Clock, MapPin, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const popularRoutes = [
    {
        id: 1,
        from: 'المنصورة',
        to: 'القاهرة',
        duration: '2 ساعة',
        distance: '120 كم',
        price: '25 جنيه',
        rating: 4.5,
        frequency: 'كل 30 دقيقة',
        description:
            'طريق سريع ومريح من المنصورة إلى القاهرة عبر الطريق الزراعي',
    },
    {
        id: 2,
        from: 'المنصورة',
        to: 'الإسكندرية',
        duration: '3 ساعة',
        distance: '180 كم',
        price: '35 جنيه',
        rating: 4.3,
        frequency: 'كل ساعة',
        description:
            'رحلة مريحة من المنصورة إلى الإسكندرية عبر طريق القاهرة الإسكندرية',
    },
    {
        id: 3,
        from: 'المنصورة',
        to: 'طنطا',
        duration: '45 دقيقة',
        distance: '45 كم',
        price: '15 جنيه',
        rating: 4.7,
        frequency: 'كل 15 دقيقة',
        description: 'رحلة قصيرة ومتكررة من المنصورة إلى طنطا',
    },
    {
        id: 4,
        from: 'المنصورة',
        to: 'زفتى',
        duration: '30 دقيقة',
        distance: '25 كم',
        price: '10 جنيه',
        rating: 4.8,
        frequency: 'كل 10 دقائق',
        description: 'رحلة سريعة ومتكررة من المنصورة إلى زفتى',
    },
];

const routeCategories = [
    { id: 'all', label: 'جميع المسارات', count: 24 },
    { id: 'popular', label: 'الأكثر شعبية', count: 8 },
    { id: 'cairo', label: 'إلى القاهرة', count: 6 },
    { id: 'alexandria', label: 'إلى الإسكندرية', count: 4 },
];

export default function RoutesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredRoutes = popularRoutes.filter(route => {
        const matchesSearch =
            route.from.includes(searchQuery) ||
            route.to.includes(searchQuery) ||
            route.description.includes(searchQuery);
        return matchesSearch;
    });

    return (
        <div className="bg-gradient-to-tr from-blue-50 via-white to-green-50 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-20 animate-fade-in-up">
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-8">
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
                </div>

                <div className="flex flex-wrap gap-3 justify-center mb-16">
                    {routeCategories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`
                px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1
                ${
                    selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-green-500 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-100'
                }
              `}
                        >
                            {category.label}
                            <span className="mr-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                                {category.count}
                            </span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
                    {filteredRoutes.map(route => (
                        <div
                            key={route.id}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                                            <MapPin className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            مسار {route.id}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm font-medium">
                                            {route.rating}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-gray-800">
                                            {route.from}
                                        </span>
                                        <ArrowRight className="w-4 h-4 text-gray-400" />
                                        <span className="font-semibold text-gray-800">
                                            {route.to}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {route.description}
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
                                            {route.duration}
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
                                            {route.distance}
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
                                            {route.price}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            السعر
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                        🚌 {route.frequency}
                                    </span>
                                </div>

                                <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-medium hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                                    عرض التفاصيل
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16 bg-white rounded-3xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                        لم تجد المسار الذي تبحث عنه؟
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        استخدم محرك البحث في الصفحة الرئيسية للعثور على أي مسار
                        في المنصورة
                    </p>
                    <Link
                        to="/"
                        className="inline-block bg-gradient-to-r from-blue-600 to-green-500 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-green-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                        العودة للصفحة الرئيسية
                    </Link>
                </div>
            </div>
        </div>
    );
}
