import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../components/shared/Footer';
import Header from '../components/shared/Header';

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
