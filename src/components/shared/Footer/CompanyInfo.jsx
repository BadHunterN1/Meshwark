import { MapPin, Phone } from 'lucide-react';

export default function CompanyInfo() {
    return (
        <div className="pr-4 md:pr-6 space-y-4">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-400 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
                    مشوارك
                </h3>
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
