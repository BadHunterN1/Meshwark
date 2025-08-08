import { lazy } from 'react';
import HeroSection from '../components/Home Sections/HeroSection/HeroSection';
const Future = lazy(() => import('../components/Home Sections/future'));
const Testmonials = lazy(
    () => import('../components/Home Sections/Testmonials')
);

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <Future />
            <Testmonials />
        </>
    );
}
