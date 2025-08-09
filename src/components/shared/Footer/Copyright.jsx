import { Link } from 'react-router-dom';

export default function Copyright() {
    return (
        <div className="border-t border-white/10 mt-8 lg:mt-10 pt-6 lg:pt-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-10">
                <p className="text-sm lg:text-base text-gray-400 text-center md:text-right">
                    جميع الحقوق محفوظة لمشوارك 2025 ©
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-sm lg:text-base text-gray-400">
                    <Link
                        to=""
                        className="hover:text-white transition-colors duration-300"
                    >
                        الشروط والأحكام
                    </Link>
                    <span className="hidden sm:inline text-gray-500">|</span>
                    <Link
                        to=""
                        className="hover:text-white transition-colors duration-300"
                    >
                        سياسة الخصوصية
                    </Link>
                </div>
            </div>
        </div>
    );
}
