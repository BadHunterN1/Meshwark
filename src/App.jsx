import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { queryClient } from './config/query';
import UserContextProvider from './Context/UserContext';
import ContactUs from './pages/ContactUs';
import ErrorPage from './pages/ErrorPage';
import FavouritePage from './pages/FavouritePage';
import HomePage from './pages/HomePage';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import RootLayout from './pages/RootLayout';
import RoutesPage from './pages/RoutesPage';
import StationInfo from './pages/StationInfo';
import TripPage from './pages/TripPage';
import AboutApp from './pages/AboutApp';

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
                path: 'routes',
                element: <RoutesPage />,
            },
            {
                element: <StationInfo />,
                path: 'station-info',
            },
            {
                element: <TripPage />,
                path: 'trip/:from/:to',
            },
            {
                element: <FavouritePage />,
                path: 'favourite',
            },
            {
                path: 'about',
                element: <AboutApp />,
            },
            {
                element: <ContactUs />,
                path: 'help',
            },

            {
                element: <Login />,
                path: 'login',
            },
            {
                element: <Register />,
                path: 'register',
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
