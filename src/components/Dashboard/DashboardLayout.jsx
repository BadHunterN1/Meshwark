import { Outlet, ScrollRestoration } from 'react-router-dom';

function DashboardLayout() {
    return (
        <>
            <ScrollRestoration />
            <Outlet />
        </>
    );
}

export default DashboardLayout;
