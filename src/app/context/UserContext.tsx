"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface UserContextType {
    userId: string | null;
    setUserId: (id: string | null) => void;
    deleteUserId: () => void;
}

const UserContext = createContext<UserContextType>({
    userId: null,
    setUserId: () => { },
    deleteUserId: () => { }
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [userId, setUserIdState] = useState<string | null>(null);

    // Wrapper to save to localStorage when updating
    const setUserId = (id: string | null) => {
        setUserIdState(id);
        if (id) {
            localStorage.setItem("userId", id);
        } else {
            localStorage.removeItem("userId");
        }
    };

    const deleteUserId = () => {
        setUserId(null);
        localStorage.removeItem("userId");
    }

    useEffect(() => {
        const storedId = localStorage.getItem("userId");
        if (storedId) {
            setUserId(storedId);
        }
    }, []);

    // Load from localStorage when app starts
    useEffect(() => {
        async function checkAuth() {
            const res = await fetch("/api/auth/check");
            if (res.status === 401) {
                setUserId(null);
                localStorage.removeItem("userId");
            }
        }
        checkAuth();
    }, []);

    return (
        <UserContext.Provider value={{ userId, setUserId, deleteUserId }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
