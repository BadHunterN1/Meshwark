import { createContext, useState, useEffect } from 'react';

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userLogin, setUserLogin] = useState(localStorage.getItem('name'));
    const [token, setToken] = useState(localStorage.getItem('token'));

    // ✅ استرجاع البوك ماركات من localStorage
    const [clickedBookmarks, setClickedBookmarks] = useState(() => {
        const stored = localStorage.getItem('clickedBookmarks');
        return stored ? JSON.parse(stored) : [];
    });

    // ✅ حفظ أي تغيير في localStorage
    useEffect(() => {
        localStorage.setItem('clickedBookmarks', JSON.stringify(clickedBookmarks));
    }, [clickedBookmarks]);

    return (
        <UserContext.Provider
            value={{
                userLogin,
                setUserLogin,
                token,
                setToken,
                clickedBookmarks,
                setClickedBookmarks,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
