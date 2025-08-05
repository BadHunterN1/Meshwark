import { AlignJustify, MapPin, X, LogOut } from "lucide-react";
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userLogin, token, setUserLogin, setToken } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUserLogin("");
  };

  return (
    <nav className="container bg-sky-50 px-6 py-4 flex items-center justify-between relative">
      <div className="flex items-center gap-2">
        <MapPin className="size-7 text-white p-1 rounded-sm bg-gradient-to-r from-blue-500 to-sky-400" />
        <span className="font-semibold text-gray-800">مشوارك</span>
      </div>

      <ul className="hidden md:flex gap-8 text-gray-500 font-medium">
        <Link to={"/"}>الرئيسية</Link>
        <a href="#">البحث عن المسارات</a>
        <Link to={"stations"}>المحطات</Link>
        <Link to={"vision"}>رؤيتنا</Link>
        <Link to={"favourite"}>المفضلة</Link>
      </ul>

      <div className="hidden md:flex items-center gap-4">
        {token ? (
          <>
            <span className="text-gray-700 font-semibold ml-5">
              👤 {userLogin}
            </span>
            <button
              onClick={handleLogout}
              title="تسجيل الخروج"
              className="text-red-600 hover:text-red-800 transition ml-3 cursor-pointer"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </>
        ) : (
          <>
            <Link to={"login"} className="text-gray-700">
              تسجيل الدخول
            </Link>
            <Link
              to={"register"}
              className="bg-[var(--main-color)] text-white rounded-md px-4 py-2 hover:bg-[var(--secondary-color)] transition"
            >
              إنشاء حساب
            </Link>
          </>
        )}
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
            <Link to={"/"} onClick={() => setIsMenuOpen(false)}>
              الرئيسية
            </Link>
            <a href="#" onClick={() => setIsMenuOpen(false)}>
              البحث عن المسارات
            </a>
            <Link to={"stations"} onClick={() => setIsMenuOpen(false)}>
              المحطات
            </Link>
            <Link to={"favourite"} onClick={() => setIsMenuOpen(false)}>
              المفضلة
            </Link>
            <hr className="border-t border-gray-300" />
            {token ? (
              <>
                <li className="text-gray-700 font-semibold">👤 {userLogin}</li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    title="تسجيل الخروج"
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <LogOut className="w-6 h-6" />
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to={"login"}
                    className="w-full bg-white text-black rounded-md px-4 py-2 hover:bg-gray-100 transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    تسجيل الدخول
                  </Link>
                </li>
                <li>
                  <Link
                    to={"register"}
                    className="w-full bg-[var(--main-color)] text-white rounded-md px-4 py-2 hover:bg-[var(--secondary-color)] transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    إنشاء حساب
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
