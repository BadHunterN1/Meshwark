import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
    { to: '/', label: 'الرئيسية' },
    { to: '/routes', label: 'المسارات' },
    { to: '/favourite', label: 'المفضلة' },
    { to: '/help', label: 'المساعدة' },
    { to: '/about', label: 'عن التطبيق' },
];

export default function NavigationMenu() {
    const location = useLocation();

    return (
        <ul className="hidden lg:flex gap-4 xl:gap-6 2xl:gap-8 text-gray-500 font-medium text-sm xl:text-base">
            {navigationItems.map(item => {
                const isActive = location.pathname === item.to;

                return (
                    <li key={item.to} className="relative">
                        <Link
                            to={item.to}
                            className={`
                relative px-2 sm:px-3 py-2 rounded-md transition-all duration-300 whitespace-nowrap
                hover:text-blue-600 hover:bg-blue-50
                ${
                    isActive
                        ? 'text-blue-600 bg-blue-50 font-semibold'
                        : 'text-gray-500 hover:text-blue-600'
                }
              `}
                        >
                            {item.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                            )}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
