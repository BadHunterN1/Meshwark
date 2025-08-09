import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export default function ProtectedRoute({ children }) {
    const { currentUser, userLoggedIn, loading } = useAuth();

    // Show loading spinner while auth is initializing
    if (loading) return <LoadingSpinner />;

    // Redirect to login if not authenticated
    if (!currentUser || !userLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
}
