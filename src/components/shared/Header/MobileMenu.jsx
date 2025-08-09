import { LogOut, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../Context/authContext';
import { doSignOut } from '../../../config/auth';

const mobileNavigationItems = [
    { to: '/', label: 'الرئيسية' },
    { to: '/routes', label: 'المسارات' },
    { to: '/favourite', label: 'المفضلة' },
    { to: '/help', label: 'المساعدة' },
    { to: '/about', label: 'عن التطبيق' },
];

export default function MobileMenu({ isOpen, onClose }) {
    const { currentUser, userLoggedIn } = useAuth();

    const handleLogout = async () => {
        try {
            await doSignOut();
            onClose();
        } catch (error) {
            console.error('Logout error:', error);
        }
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
                        return (
                            <li key={item.to}>
                                <NavLink
                                    to={item.to}
                                    onClick={onClose}
                                    className={({ isActive }) => `
                    block px-4 py-3 rounded-lg transition-all duration-300
                    ${
                        isActive
                            ? 'bg-blue-50 text-blue-600 font-semibold'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>

                <div className="border-t border-gray-200 px-4 py-4">
                    {currentUser && userLoggedIn ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-lg">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-gray-700 font-semibold text-sm">
                                    {currentUser.displayName ||
                                        currentUser.email}
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
                            <NavLink
                                to={'login'}
                                className={({ isActive }) =>
                                    `block w-full text-center border border-gray-300 rounded-lg px-4 py-3 transition-all duration-300 ${
                                        isActive
                                            ? 'text-white font-semibold border-b-2 bg-blue-600'
                                            : 'text-gray-500 hover:bg-gray-50 bg-white hover:text-blue-600'
                                    }`
                                }
                                onClick={onClose}
                            >
                                تسجيل الدخول
                            </NavLink>
                            <NavLink
                                to={'register'}
                                className={({ isActive }) =>
                                    `block w-full text-center border border-gray-300 rounded-lg px-4 py-3 transition-all duration-300 ${
                                        isActive
                                            ? 'text-white font-semibold border-b-2 bg-blue-600'
                                            : 'text-gray-500 hover:bg-gray-50 bg-white hover:text-blue-600'
                                    }`
                                }
                                onClick={onClose}
                            >
                                إنشاء حساب
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
