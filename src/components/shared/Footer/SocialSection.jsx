import { Facebook, Instagram, Mail, Send } from 'lucide-react';

const socialLinks = [
  { href: '#', icon: Send, label: 'تيليجرام' },
  { href: '#', icon: Instagram, label: 'إنستجرام' },
  { href: '#', icon: Facebook, label: 'فيسبوك' },
];

export default function SocialSection() {
  return (
    <div className="pl-4 md:pl-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-sky-300 rounded-md flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
        <h4 className="text-lg lg:text-xl font-bold text-white">تواصل معنا</h4>
      </div>

      <ul className="space-y-3">
        {socialLinks.map(social => (
          <li key={social.label}>
            <a
              href={social.href}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-sky-400 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <social.icon size={16} className="text-white" />
              </div>
              <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                {social.label}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="space-y-4">
        <h5 className="text-sm lg:text-base font-semibold text-white">
          اشترك في النشرة الإخبارية
        </h5>
        <div className="relative">
          <div className="flex rounded-lg overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="bg-gradient-to-r from-blue-500 to-sky-400 p-3 flex items-center justify-center">
              <Mail className="text-white w-5 h-5" />
            </div>
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              className="bg-transparent text-white placeholder-gray-300 px-4 py-3 w-full focus:outline-none text-right focus:bg-white/5 transition-all duration-300"
            />
          </div>
          <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-sky-400 text-white px-4 py-1 rounded-md text-sm hover:from-blue-600 hover:to-sky-500 transition-all duration-300">
            اشتراك
          </button>
        </div>
      </div>
    </div>
  );
}
