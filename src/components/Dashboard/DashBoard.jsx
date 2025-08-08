import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import {
    Route,
    Plus,
    MessageSquare,
    LogOut,
    Users,
    MapPin,
    BarChart3,
} from 'lucide-react';
import { doSignOut } from '../../config/auth';

export default function DashBoard() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleLogout = async () => {
        try {
            await doSignOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const adminFeatures = [
        {
            title: 'إدارة المسارات',
            description: 'عرض وتعديل وحذف المسارات الموجودة',
            icon: <Route className="w-6 h-6" />,
            path: '/admin/manage-routes',
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
        },
        {
            title: 'إضافة مسار جديد',
            description: 'إضافة مسار جديد إلى النظام',
            icon: <Plus className="w-6 h-6" />,
            path: '/admin/add-route',
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
        },
        {
            title: 'مراجعة الاقتراحات',
            description: 'مراجعة اقتراحات المستخدمين للمسارات الجديدة',
            icon: <MessageSquare className="w-6 h-6" />,
            path: '/admin/review-suggestions',
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
        },
        {
            title: 'إدارة المستخدمين',
            description: 'عرض وإدارة حسابات المستخدمين',
            icon: <Users className="w-6 h-6" />,
            path: '/admin/manage-users',
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-200',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    لوحة إدارة مشوارك
                                </h1>
                                <p className="text-sm text-gray-600">
                                    مرحباً{' '}
                                    {currentUser?.displayName ||
                                        currentUser?.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 space-x-reverse">
                            <button
                                onClick={handleLogout}
                                className="flex items-center space-x-2 space-x-reverse px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 text-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span className="hidden sm:inline">
                                    تسجيل الخروج
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Route className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">
                                    إجمالي المسارات
                                </p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    24
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">
                                    المستخدمين النشطين
                                </p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    156
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">
                                    الاقتراحات الجديدة
                                </p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    8
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                        <div className="flex items-center">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                            </div>
                            <div className="mr-3 sm:mr-4">
                                <p className="text-xs sm:text-sm font-medium text-gray-600">
                                    الزيارات اليوم
                                </p>
                                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                                    1,234
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    {adminFeatures.map((feature, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(feature.path)}
                            className={`${feature.bgColor} ${feature.borderColor} border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                        >
                            <div className="flex items-start space-x-3 sm:space-x-4 space-x-reverse">
                                <div
                                    className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}
                                >
                                    {feature.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                                <span>انقر للوصول</span>
                                <div className="mr-2 w-4 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">
                        إجراءات سريعة
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                        <button
                            onClick={() => navigate('/admin/add-route')}
                            className="flex items-center justify-center space-x-2 space-x-reverse px-3 sm:px-4 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            <span>إضافة مسار جديد</span>
                        </button>
                        <button
                            onClick={() =>
                                navigate('/admin/review-suggestions')
                            }
                            className="flex items-center justify-center space-x-2 space-x-reverse px-3 sm:px-4 py-2 sm:py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 text-sm"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>مراجعة الاقتراحات</span>
                        </button>
                        <button
                            onClick={() => navigate('/admin/manage-routes')}
                            className="flex items-center justify-center space-x-2 space-x-reverse px-3 sm:px-4 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 text-sm"
                        >
                            <Route className="w-4 h-4" />
                            <span>إدارة المسارات</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
