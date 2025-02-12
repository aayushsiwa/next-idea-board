"use client";

import { useState, useEffect } from "react";
import CardList from "@/components/CardList";
import Nav from "@/components/ui/Nav";
import { getAuth, User } from "firebase/auth";

async function fetchUser(token: string): Promise<User | null> {
    const response = await fetch("/api/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!response.ok) {
        return null;
    }
    const user = await response.json();
    return user;
}

export default function Home() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                const fetchedUser = await fetchUser(token); // Call API to fetch user
                setUser(fetchedUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-20 items-center justify-center p-8">
            <Nav user={user} />
            <div className="mt-24">
                <CardList />
            </div>
        </div>
    );
}
