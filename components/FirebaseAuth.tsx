"use client";

import React, { useEffect, useState } from "react";
import {
    handleGoogleSignIn,
    handleGitHubSignIn,
    logOut,
} from "../lib/firebaseConfig";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
// import { useRouter } from "next/navigation";

const FirebaseAuth = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    // const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
            setLoading(false);
            setUser(user);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            {loading ? (
                <div>Loading...</div>
            ) : user ? (
                <ul className="bg-background text-text">
                    <li className="px-4 py-2 hover:bg-secondary cursor-pointer text-text">
                        Welcome, {user.displayName || "User"}!
                    </li>
                    <li className="px-4 py-2 hover:bg-secondary cursor-pointer text-text">
                        Settings
                    </li>
                    <li
                        className="px-4 py-2 hover:bg-secondary cursor-pointer text-text"
                        onClick={logOut}
                    >
                        Log Out
                    </li>
                </ul>
            ) : (
                <div className="bg-background flex flex-col">
                    <button
                        onClick={handleGoogleSignIn}
                        className="px-4 py-2 hover:bg-secondary cursor-pointer text-text"
                    >
                        Sign In with Google
                    </button>
                    <button
                        onClick={handleGitHubSignIn}
                        className="px-4 py-2 hover:bg-secondary cursor-pointer text-text"
                    >
                        Sign In with GitHub
                    </button>
                </div>
            )}
        </div>
    );
};

export default FirebaseAuth;
