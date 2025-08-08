import { createContext, useState } from 'react';

export const PathContext = createContext();

export function PathProvider({ children }) {
    const [selectedPath, setSelectedPath] = useState({});

    return (
        <PathContext.Provider value={{ selectedPath, setSelectedPath }}>
            {children}
        </PathContext.Provider>
    );
}
