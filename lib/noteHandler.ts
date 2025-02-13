import { getDatabase, ref, set, get, remove, child } from "firebase/database";
import { app } from "@/lib/firebaseConfig";

const db = getDatabase(app);

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
