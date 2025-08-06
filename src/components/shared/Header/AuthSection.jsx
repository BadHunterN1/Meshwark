import { LogOut, User } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';

export default function AuthSection() {
  const { userLogin, token, setUserLogin, setToken } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUserLogin('');
  };

  if (token) {
    return (
      <div className="hidden lg:flex items-center gap-2 xl:gap-4">
        <div className="flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
          <div className="w-6 h-6 xl:w-8 xl:h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 xl:w-4 xl:h-4 text-white" />
          </div>
          <span className="text-gray-700 font-semibold text-xs xl:text-sm">
            {userLogin}
          </span>
        </div>
        <button
          onClick={handleLogout}
          title="تسجيل الخروج"
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300 group"
        >
          <LogOut className="w-4 h-4 xl:w-5 xl:h-5 group-hover:scale-110 transition-transform duration-300" />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-2 xl:gap-4">
      <Link
        to={'login'}
        className="text-gray-600 hover:text-blue-600 font-medium text-sm xl:text-base transition-all duration-300 hover:scale-105"
      >
        تسجيل الدخول
      </Link>
      <Link
        to={'register'}
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 xl:px-6 py-2 rounded-lg font-medium text-sm xl:text-base shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
      >
        إنشاء حساب
      </Link>
    </div>
  );
}
