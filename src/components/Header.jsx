import { AlignJustify, X } from "lucide-react";
import React, { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-[#f5fbff] px-6 py-4 flex items-center justify-between rtl relative">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        <span className="font-semibold text-gray-800">مشوارك</span>
      </div>

      <ul className="hidden md:flex gap-8 text-gray-500 font-medium">
        <li>الرئيسية</li>
        <li>البحث عن المسارات</li>
        <li>المحطات</li>
        <li>تواصل معنا</li>
      </ul>

      <div className="hidden md:flex items-center gap-4">
        <span className="text-gray-700">تسجيل الدخول</span>
        <button className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
          إنشاء حساب
        </button>
      </div>

      <button
        className="md:hidden text-gray-700"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X /> : <AlignJustify />}
      </button>

      {isMenuOpen && (
        <div className="absolute top-full right-0 w-full bg-white shadow-md md:hidden text-right z-50">
          <ul className="flex flex-col gap-4 px-6 py-4 text-gray-700 font-medium">
            <hr className="border-t border-gray-300" />

            <li>الرئيسية</li>
            <li>البحث عن المسارات</li>
            <li>المحطات</li>
            <li>تواصل معنا</li>
            <hr className="border-t border-gray-300" />

            <li>
              <button className="w-full bg-white-500 text-black rounded-md px-4 py-2 hover:bg-white-600 transition">
                تسجيل الدخول
              </button>
            </li>
            <li>
              <button className="w-full bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition">
                إنشاء حساب
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
