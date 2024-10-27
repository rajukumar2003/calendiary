//frontend/src/hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged, User, getIdToken } from 'firebase/auth';

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const token = await getIdToken(user);
                setToken(token);
                // Store the token in localStorage to be used for authorization
                localStorage.setItem('token', token);
            } else {
                setUser(null);
                setToken(null);
                localStorage.removeItem('token');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, token, loading };
}
