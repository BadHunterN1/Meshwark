import { createContext, useState } from 'react';

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
    const [userLogin, setUserLogin] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [clickedBookmarks, setClickedBookmarks] = useState([]);
    console.log(token);

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
