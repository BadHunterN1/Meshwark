import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export default function ProtectedRoute({ children }) {
    const { currentUser, userLoggedIn, loading } = useAuth();

    if (loading) return <LoadingSpinner />;

    if (!currentUser || !userLoggedIn) {
        return <Navigate to="/login" />;
    }

    return children;
}
