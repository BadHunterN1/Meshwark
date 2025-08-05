import { LogOut, User } from 'lucide-react';
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';

const mobileNavigationItems = [
    { to: '/', label: 'الرئيسية' },
    { to: '/routes', label: 'المسارات' },
    { to: '/favorite', label: 'المفضلة' },
    { to: '/vision', label: 'الرؤية' },
    { to: '/help', label: 'المساعدة' },
    { to: '/about', label: 'عن التطبيق' },
];

export default function MobileMenu({ isOpen, onClose }) {
    const { userLogin, token, setUserLogin, setToken } =
        useContext(UserContext);
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUserLogin('');
        onClose();
    };

    return (
        <div
            className={`
        absolute top-full right-0 w-full bg-white shadow-lg lg:hidden text-right z-50
        transform transition-all duration-300 ease-in-out
        ${
            isOpen
                ? 'translate-y-0 opacity-100'
                : '-translate-y-4 opacity-0 pointer-events-none'
        }
      `}
        >
            <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white">
                <ul className="flex flex-col gap-1 px-4 py-4">
                    {mobileNavigationItems.map(item => {
                        const isActive = location.pathname === item.to;

                        return (
                            <li key={item.to}>
                                <Link
                                    to={item.to}
                                    onClick={onClose}
                                    className={`
                    block px-4 py-3 rounded-lg transition-all duration-300
                    ${
                        isActive
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <div className="border-t border-gray-200 px-4 py-4">
                    {token ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-700 font-semibold text-sm">
                                    {userLogin}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                title="تسجيل الخروج"
                                className="w-full flex items-center justify-center gap-2 p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>تسجيل الخروج</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            <Link
                                to={'login'}
                                className="block w-full text-center bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-all duration-300"
                                onClick={onClose}
                            >
                                تسجيل الدخول
                            </Link>
                            <Link
                                to={'register'}
                                className="block w-full text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg px-4 py-3 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                                onClick={onClose}
                            >
                                إنشاء حساب
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
