import React, { useState } from 'react';
import AuthSection from './AuthSection';
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import MobileToggle from './MobileToggle';
import NavigationMenu from './NavigationMenu';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMobileMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMobileMenuClose = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="w-full bg-gradient-to-r from-sky-50 to-blue-50 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between relative shadow-sm border-b border-gray-100">
            <Logo />

            <NavigationMenu />

            <AuthSection />

            <MobileToggle
                isOpen={isMenuOpen}
                onToggle={handleMobileMenuToggle}
            />

            <MobileMenu isOpen={isMenuOpen} onClose={handleMobileMenuClose} />
        </nav>
    );
}
