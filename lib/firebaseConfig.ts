// lib/firebaseConfig.js

import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    GithubAuthProvider,
    onAuthStateChanged,
    updateProfile,
    signOut,
    updateEmail,
    User,
    signInWithPopup,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove, child } from "firebase/database"; // Import Firebase Realtime Database functions

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// console.log(firebaseConfig);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

// export default firebase;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account",
});

const githubProvider = new GithubAuthProvider();

const db = getDatabase(app); // Initialize Realtime Database

export const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

export const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);

export { onAuthStateChanged };

export const updateUserProfile = async (user: User, displayName: string) => {
    try {
        await updateProfile(user, {
            displayName,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const updateUserEmail = async (user: User, email: string) => {
    try {
        await updateEmail(user, email);
    } catch (error) {
        console.error("Error updating email:", error);
        throw error;
    }
};

export const handleGoogleSignIn = async () => {
    try {
        await signInWithPopup(auth, googleProvider);
        console.log("Signed in with Google successfully!");
        // navigate("/restricted"); // Redirect to /restricted on successful sign-in
    } catch (error) {
        console.log("Google sign-in error: " + (error as Error).message);
    }
};

export const handleGitHubSignIn = async () => {
    try {
        await signInWithPopup(auth, githubProvider);
        console.log("Signed in with GitHub successfully!");
        // navigate("/restricted"); // Redirect to /restricted on successful sign-in
    } catch (error) {
        console.log("GitHub sign-in error: " + (error as Error).message);
    }
};

export const addNote = async (
    userId: string,
    note: { id: string; title: string; body: string; lastEdited: number }
) => {
    try {
        await set(ref(db, `notes/${userId}/${note.id}`), note);
    } catch (error) {
        console.error("Error adding note:", error);
        throw error;
    }
};

export const updateNote = async (
    userId: string,
    note: { id: string; title: string; body: string; lastEdited: number }
) => {
    try {
        await set(ref(db, `notes/${userId}/${note.id}`), note);
    } catch (error) {
        console.error("Error updating note:", error);
        throw error;
    }
};

export const deleteNote = async (userId: string, id: string) => {
    try {
        await remove(ref(db, `notes/${userId}/${id}`));
    } catch (error) {
        console.error("Error deleting note:", error);
        throw error;
    }
};

export const getNotes = async (userId: string) => {
    try {
        const snapshot = await get(child(ref(db), `notes/${userId}`));
        if (snapshot.exists()) {
            return Object.values(snapshot.val());
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error fetching notes:", error);
        throw error;
    }
};
