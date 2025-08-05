import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 cursor-pointer">
      <MapPin className="size-6 sm:size-7 text-white p-1 rounded-sm bg-gradient-to-r from-blue-500 to-sky-400" />
      <span className="font-semibold text-gray-800 text-sm sm:text-base lg:text-lg">
        مشوارك
      </span>
    </Link>
  );
}
