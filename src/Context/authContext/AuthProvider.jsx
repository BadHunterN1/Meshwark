import React, { useEffect, useState } from 'react';
import { AuthContext } from './index';

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe = null;
        (async () => {
            const [{ onAuthStateChanged }, { auth }] = await Promise.all([
                import('firebase/auth'),
                import('../../config/firebase'),
            ]);
            unsubscribe = onAuthStateChanged(auth, initializeUser, () =>
                setLoading(false)
            );
        })();
        return () => {
            if (typeof unsubscribe === 'function') unsubscribe();
        };
    }, []);

    async function initializeUser(user) {
        try {
            if (user) {
                setCurrentUser({ ...user });
                setUserLoggedIn(true);
            } else {
                setCurrentUser(null);
                setUserLoggedIn(false);
            }
        } catch {
            throw new Error('Can not add new users at this moment.');
        } finally {
            setLoading(false);
        }
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}
