import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export default function AdminRoute({ children }) {
    const { currentUser, userLoggedIn, loading } = useAuth();

    // Show loading spinner while auth is initializing
    if (loading) return <LoadingSpinner />;

    // Check if user is logged in and is admin
    const isAdmin = currentUser?.email === 'admin@meshwark.com';

    if (!currentUser || !userLoggedIn) {
        return <Navigate to="/login" />;
    }

    if (!isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
}
