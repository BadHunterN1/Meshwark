import { ArrowRight, Clock, MapPin, Search, Star } from 'lucide-react';
import React, { useState } from 'react';
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
    description: 'طريق سريع ومريح من المنصورة إلى القاهرة عبر الطريق الزراعي',
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
  { id: 'local', label: 'محلية', count: 12 },
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50">
      <section className="bg-gradient-to-r from-blue-600 to-sky-600 text-white py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6">
            <h1 className="text-3xl lg:text-5xl font-bold">
              اكتشف أفضل المسارات
            </h1>
            <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto">
              اختر من مئات المسارات المتاحة في المنصورة وضواحيها. نقدم لك أفضل
              الطرق وأسرعها مع معلومات دقيقة ومحدثة
            </p>

            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="ابحث عن مسار من المنصورة إلى..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-12 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {routeCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`
                  px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }
                `}
              >
                {category.label}
                <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoutes.map(route => (
              <div
                key={route.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100 overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
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
                      <Clock className="w-5 h-5 text-blue-600 mx-auto" />
                      <div className="text-sm font-medium text-gray-800">
                        {route.duration}
                      </div>
                      <div className="text-xs text-gray-500">المدة</div>
                    </div>
                    <div className="space-y-1">
                      <MapPin className="w-5 h-5 text-green-600 mx-auto" />
                      <div className="text-sm font-medium text-gray-800">
                        {route.distance}
                      </div>
                      <div className="text-xs text-gray-500">المسافة</div>
                    </div>
                    <div className="space-y-1">
                      <div className="w-5 h-5 text-orange-600 mx-auto flex items-center justify-center font-bold text-sm">
                        ج
                      </div>
                      <div className="text-sm font-medium text-gray-800">
                        {route.price}
                      </div>
                      <div className="text-xs text-gray-500">السعر</div>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-xs text-gray-500">
                      🚌 {route.frequency}
                    </span>
                  </div>

                  <button className="w-full bg-gradient-to-r from-blue-600 to-sky-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-sky-700 transition-all duration-300 transform hover:scale-105">
                    عرض التفاصيل
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-blue-600 to-sky-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            لم تجد المسار الذي تبحث عنه؟
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            استخدم محرك البحث في الصفحة الرئيسية للعثور على أي مسار في المنصورة
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all duration-300">
            <Link to={'/'}> العودة للصفحة الرئيسية</Link>
          </button>
        </div>
      </section>
    </div>
  );
}
