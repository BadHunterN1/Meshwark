import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../components/shared/Header';
import Footer from '../components/shared/Footer';

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
