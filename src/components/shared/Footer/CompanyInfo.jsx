import { MapPin, Phone } from 'lucide-react';

export default function CompanyInfo() {
    return (
        <div className="pr-4 md:pr-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <img className="h-14" src="/logo.webp" alt="logo" />
                <span className="font-semibold text-[var(--main-color)] text-sm sm:text-base lg:text-lg">
                    مشوارك
                </span>
            </div>

            <p className="text-sm lg:text-base text-gray-300 leading-relaxed">
                تطبيق آمن لكل اللي بيستخدمه، بيساعدك في الوصول لأقرب خط مواصلات
                في المنصورة بكل سهولة مع معلومات دقيقة ومحدثة
            </p>

            <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                    <MapPin
                        size={18}
                        className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                    />
                    <span className="text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                        المنصورة, مصر
                    </span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group">
                    <Phone
                        size={18}
                        className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300"
                    />
                    <span className="text-sm lg:text-base text-gray-300 group-hover:text-white transition-colors duration-300">
                        01234567890
                    </span>
                </div>
            </div>
        </div>
    );
}
