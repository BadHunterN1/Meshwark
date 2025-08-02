// import { lazy, Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
