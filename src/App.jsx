import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { queryClient } from './config/query';

import HomePage from './pages/HomePage';
import RootLayout from './pages/RootLayout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import AdminRoute from './protectedRoute/AdminRoute';
import LoadingSpinner from './components/shared/LoadingSpinner';
import { AuthProvider } from './Context/authContext';
import LoginPage from './pages/LoginPage';

// Lazy load pages
const ContactUs = lazy(() => import('./pages/ContactUs'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const FavouritePage = lazy(() => import('./pages/FavouritePage'));
const Register = lazy(() => import('./pages/RegisterPage'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const StationInfo = lazy(() => import('./pages/StationInfo'));
const TripPage = lazy(() => import('./pages/TripPage'));
const AboutApp = lazy(() => import('./pages/AboutApp'));
const GoogleMap = lazy(() => import('./components/Trip Sections/Map'));

// Admin components
const DashboardLayout = lazy(
    () => import('./components/Dashboard/DashboardLayout')
);
const DashBoard = lazy(() => import('./components/Dashboard/DashBoard'));
const ManageRoutes = lazy(() => import('./components/Dashboard/ManageRoutes'));
const AddRoute = lazy(() => import('./components/Dashboard/AddRoute'));
const ReviewSuggestions = lazy(
    () => import('./components/Dashboard/ReviewSuggestions')
);
const ManageUsers = lazy(() => import('./components/Dashboard/ManageUsers'));

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
                path: 'trip/:from/:to',
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
                element: <LoginPage />,
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
        path: '/admin',
        element: (
            <AdminRoute>
                <DashboardLayout />
            </AdminRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <DashBoard />
                    </Suspense>
                ),
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <ManageRoutes />
                    </Suspense>
                ),
                path: 'manage-routes',
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <AddRoute />
                    </Suspense>
                ),
                path: 'add-route',
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <ReviewSuggestions />
                    </Suspense>
                ),
                path: 'review-suggestions',
            },
            {
                element: (
                    <Suspense fallback={<LoadingSpinner />}>
                        <ManageUsers />
                    </Suspense>
                ),
                path: 'manage-users',
            },
        ],
    },
]);

function App() {
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;
