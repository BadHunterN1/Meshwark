import { AlignJustify, X } from 'lucide-react';

export default function MobileToggle({ isOpen, onToggle }) {
  return (
    <button
      className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 group"
      onClick={onToggle}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="relative w-5 h-5 sm:w-6 sm:h-6">
        <AlignJustify
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
            isOpen
              ? 'opacity-0 rotate-90 scale-0'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <X
          className={`absolute inset-0 w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
            isOpen
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
    </button>
  );
}
