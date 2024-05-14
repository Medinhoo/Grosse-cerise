import React, { useEffect } from 'react';
import { logged$, user$ } from '../rxjs';

const AuthProvider = ({ children }) => {
    useEffect(() => {
        const checkLoggedInUser = () => {
            const user = localStorage.getItem('user');
            if (user) {
                const parsedUser = JSON.parse(user);
                user$.next(parsedUser);
                logged$.next(true);
            }
        };

        checkLoggedInUser();

        // Nettoyage de l'effet si nécessaire
        return () => {
            // Aucun nettoyage nécessaire dans ce cas
        };
    }, []);

    return <>{children}</>; // Rendu des composants enfants
};

export default AuthProvider;
