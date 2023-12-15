import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Logic for successful login
        setIsLoggedIn(true);
    };

    const setLogout = () => {
        setIsLoggedIn(false);
    }

    const contextValues = {
        isLoggedIn,
        handleLogin,
        setLogout,
    };

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };