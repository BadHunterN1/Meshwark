import { Link } from 'react-router-dom';

const quickLinks = [
    { href: '/about', label: 'عن التطبيق' },
    { href: '/help', label: 'اتصل بنا' },
    { href: '/login', label: 'تسجيل الدخول' },
];

export default function QuickLinks() {
    return (
        <div className="px-4 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-sky-300 rounded-md flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <h4 className="text-lg lg:text-xl font-bold text-white">
                    روابط سريعة
                </h4>
            </div>

            <ul className="space-y-3">
                {quickLinks.map(link => (
                    <li key={link.label}>
                        <Link
                            to={link.href}
                            className="block px-3 py-2 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-300 text-gray-300 hover:translate-x-1"
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
