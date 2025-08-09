import {
    Outlet,
    ScrollRestoration,
    useLocation,
    useNavigate,
} from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { ArrowLeft, Home } from 'lucide-react';

function DashboardLayout() {
    const { currentUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Admin Navigation Bar */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-3">
                        <div className="flex items-center space-x-3 sm:space-x-4 space-x-reverse">
                            <button
                                onClick={() => navigate('/admin')}
                                className="flex cursor-pointer items-center space-x-2 space-x-reverse text-gray-600 hover:text-gray-900 transition-colors duration-300"
                            >
                                <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                                <span className="font-medium text-sm sm:text-base">
                                    لوحة الإدارة
                                </span>
                            </button>
                            {location.pathname !== '/admin' && (
                                <button
                                    onClick={() => navigate('/admin')}
                                    className="flex items-center cursor-pointer space-x-2 space-x-reverse text-blue-600 hover:text-blue-700 transition-colors duration-300 text-sm"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    <span className="hidden sm:inline">
                                        العودة للوحة الرئيسية
                                    </span>
                                </button>
                            )}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-500">
                            {currentUser?.displayName || currentUser?.email}
                        </div>
                    </div>
                </div>
            </div>

            <ScrollRestoration />
            <Outlet />
        </div>
    );
}

export default DashboardLayout;
