import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';

export default function AdminRoute({ children }) {
    const { currentUser, userLoggedIn, loading } = useAuth();

    // Show loading spinner while auth is initializing
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

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
