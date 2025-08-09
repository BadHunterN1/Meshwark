import { lazy } from 'react';
import MotionFadeIn from '../components/UI/MotionFadeIn';
import HeroSection from '../components/Home Sections/HeroSection/HeroSection';
const Future = lazy(() => import('../components/Home Sections/future'));
const Testmonials = lazy(
    () => import('../components/Home Sections/Testmonials')
);

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <MotionFadeIn delay={0.05}>
                <Future />
            </MotionFadeIn>
            <MotionFadeIn delay={0.1}>
                <Testmonials />
            </MotionFadeIn>
        </>
    );
}
