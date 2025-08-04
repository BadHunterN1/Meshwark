
import {
  Send,
  Instagram,
  Facebook,
  Phone,
  MapPin,
  Mail
} from 'lucide-react'; 

export default function Footer() {
  return (
    <footer className="bg-[#2c3e50] text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 rtl">

        {/* العمود الأول */}
        <div className="pr-4 md:pr-6">
          <h3 className="text-xl font-semibold mb-3 text-[var(--main-color)]">مواصلات المنصورة</h3>
          <p className="text-sm text-gray-300 mb-2">
            تطبيق آمن لكل اللي بيستخدمه، بيساعدك في الوصول لأقرب خط مواصلات في المنصورة بكل سهولة مع معلومات دقيقة ومحدثة
          </p>
          <p className="text-sm text-gray-300 mb-1 flex items-center gap-2">
            <MapPin size={16} className="text-[var(--main-color)]" />
            المنصورة محافظة الدقهلية مصر
          </p>
          <p className="text-sm text-gray-300 flex items-center gap-2">
            <Phone size={16} className="text-[var(--main-color)]" />
            +20 50 123 4067
          </p>
        </div>

        {/* العمود الثاني */}
        <div className="px-4 md:flex md:flex-col md:items-center md:text-center">
          <h4 className="text-lg font-semibold mb-3">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-white">عن التطبيق</a></li>
            <li><a href="#" className="hover:text-white">طريقة الاستخدام</a></li>
            <li><a href="#" className="hover:text-white">خدمة العملاء</a></li>
            <li><a href="#" className="hover:text-white">اتصل بنا</a></li>
            <li><a href="#" className="hover:text-white">سياسة الخصوصية</a></li>
          </ul>
        </div>

        {/* العمود الثالث */}
        <div className="pl-4 md:pl-6">
          <h4 className="text-lg font-semibold mb-3">تواصل معنا</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#" className="hover:text-white flex items-center gap-2">
                <Send size={16} />
                تيليجرام
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white flex items-center gap-2">
                <Instagram size={16} />
                إنستجرام
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white flex items-center gap-2">
                <Facebook size={16} />
                فيسبوك
              </a>
            </li>
          </ul>

          {/* email */}
          <div className="mt-6">
            <h5 className="mb-3 text-sm text-right">اشترك في النشرة الإخبارية</h5>
            <div className="flex rounded-lg overflow-hidden bg-[#34495E] max-w-xs">
              <div className="bg-[#3498DB] p-3 flex items-center justify-center">
                <Mail className="text-white w-5 h-5" />
              </div>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="bg-transparent text-white placeholder-gray-300 px-4 py-2 w-full focus:outline-none text-right"
              />
            </div>
          </div>
        </div>
      </div>

      {/* الحقوق و الشروط*/}
      <div className="border-t border-gray-600 mt-10 pt-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center gap-2 px-4 md:px-10">
        <p className="md:order-1 text-center md:text-right">© 2024 مواصلات المنصورة. جميع الحقوق محفوظة.</p>
        <p className="md:order-2 text-center md:text-left">الشروط والأحكام | سياسة الخصوصية</p>
      </div>
    </footer>
  );
}
