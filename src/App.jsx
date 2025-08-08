import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { queryClient } from './config/query';
import UserContextProvider from './Context/UserContext';
import HomePage from './pages/HomePage';
import RootLayout from './pages/RootLayout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';

// Lazy load all pages except HomePage and RootLayout
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const FavouritePage = lazy(() => import('./pages/FavouritePage'));
const Login = lazy(() => import('./pages/LoginPage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const StationInfo = lazy(() => import('./pages/StationInfo'));
const TripPage = lazy(() => import('./pages/TripPage'));
const AboutApp = lazy(() => import('./pages/AboutApp'));
const GoogleMap = lazy(() => import('./components/Trip Sections/Map'));
const ManageRoutes = lazy(() => import('./components/Dashboard/ManageRoutes'));
const AddRoute = lazy(() => import('./components/Dashboard/AddRoute'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        errorElement: (
            <Suspense fallback={<LoadingSpinner />}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'routes',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <RoutesPage />
                    </Suspense>
                ),
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <StationInfo />
                    </Suspense>
                ),
                path: 'station-info',
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <TripPage />
                    </Suspense>
                ),
                path: 'trip',
                children: [
                    {
                        path: 'map',
                        element: (
                            <Suspense fallback={<LoadingSpinner />}>
                                <GoogleMap />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingSpinner />}>
                            <FavouritePage />
                        </Suspense>
                    </ProtectedRoute>
                ),
                path: 'favourite',
            },
            {
                path: 'about',
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AboutApp />
                    </Suspense>
                ),
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <ContactUs />
                    </Suspense>
                ),
                path: 'help',
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Login />
                    </Suspense>
                ),
                path: 'login',
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <Register />
                    </Suspense>
                ),
                path: 'register',
            },
        ],
    },
    {
        element: (
            <ProtectedRoute>
                <Suspense fallback={<LoadingSpinner />}>
                    <ManageRoutes />
                </Suspense>
            </ProtectedRoute>
        ),
        path: 'ManageRoutes',
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
