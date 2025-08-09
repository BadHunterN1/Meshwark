import { Link } from 'react-router-dom';
export default function Logo() {
    return (
        <Link to="/" className="flex items-center cursor-pointer">
            <img className="h-14" src="/logo.webp" alt="logo" />
            <span className="font-semibold text-[var(--main-color)] text-sm sm:text-base lg:text-lg">
                مشوارك
            </span>
        </Link>
    );
}
