import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { queryClient } from './config/query';
import UserContextProvider from './Context/UserContext';
import HomePage from './pages/HomePage';
import RootLayout from './pages/RootLayout';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import LoadingSpinner from './components/shared/LoadingSpinner';

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
const DashboardLayout = lazy(
    () => import('./components/Dashboard/DashboardLayout')
);
const ManageRoutes = lazy(() => import('./components/Dashboard/ManageRoutes'));
const AddRoute = lazy(() => import('./components/Dashboard/AddRoute'));
const ReviewSuggestions = lazy(
    () => import('./components/Dashboard/ReviewSuggestions')
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
                path: 'station-info/:stationId',
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
        element: <DashboardLayout />,
        children: [
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
            {
                element: <AddRoute />,
                path: '/ManageRoutes/add-route',
            },
            {
                element: <ReviewSuggestions />,
                path: '/ManageRoutes/review-suggestions',
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
