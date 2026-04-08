import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check local storage for persistent mock login
        const storedUser = localStorage.getItem('soutmedia_admin');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        // Hardcoded credentials per requirements
        if (username === 'admin' && password === 'admin2002') {
            const adminData = { username: 'admin', role: 'superadmin', name: 'المدير العام' };
            setUser(adminData);
            localStorage.setItem('soutmedia_admin', JSON.stringify(adminData));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('soutmedia_admin');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
