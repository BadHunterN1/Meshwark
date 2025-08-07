import { Outlet, ScrollRestoration } from 'react-router-dom';
import { lazy } from 'react';
import Header from '../components/shared/Header';
const Footer = lazy(() => import('../components/shared/Footer'));
// import Footer from '../components/shared/Footer';

function RootLayout() {
    return (
        <>
            <Header />
            <ScrollRestoration />
            <Outlet />
            <Footer />
        </>
    );
}

export default RootLayout;
