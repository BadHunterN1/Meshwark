import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { queryClient } from './config/query';
import UserContextProvider from './Context/UserContext';
import ErrorPage from './pages/ErrorPage';
import FavouritePage from './pages/FavouritePage';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import RootLayout from './pages/RootLayout';
import RoutesPage from './pages/RoutesPage';
import StationInfo from './pages/StationInfo';
import TripPage from './pages/TripPage';
import Vision from './pages/VisionPage';

import ContactUs from './pages/contactUs';
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                element: <StationInfo />,
                path: 'station-info',
            },
            {
                element: <TripPage />,
                path: 'trip',
            },
            {
                element: <FavouritePage />,
                path: 'favourite',
            },
            {
                element: <Login />,
                path: 'login',
            },
            {
                element: <Register />,
                path: 'register',
            },
            {
                path: 'vision',
                element: <Vision />,
            },
            {
                path: 'routes',
                element: <RoutesPage />,
            },
        ],
    },
]);

function App() {
    return (
        <UserContextProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </UserContextProvider>
    );
}

export default App;
