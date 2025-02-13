import React, { useState, useEffect } from "react";
import Card from "./ui/Card";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { auth } from "@/lib/firebaseConfig";
import Compose from "./ui/Compose";
import { updateNote } from "@/lib/noteHandler";

function CardList() {
    const [notes, setNotes] = useState<
        { lastEdited: number; id: string; title: string; body: string }[]
    >([]);
    const [user, setUser] = useState(auth.currentUser);

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged((newUser) => {
            setUser(newUser);
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (!user) return;

        const db = getDatabase();
        const notesRef = ref(db, `notes/${user.uid}`);
        // console.log(notesRef);
        const unsubscribe = onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notesArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setNotes(
                    notesArray.sort((a, b) => b.lastEdited - a.lastEdited)
                );
            } else {
                setNotes([]);
            }
        });

        return () => unsubscribe();
    }, [user]);

    const fetchNotes = () => {
        if (!user) return;

        const db = getDatabase();
        const notesRef = ref(db, `notes/${user.uid}`);
        onValue(notesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const notesArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setNotes(
                    notesArray.sort((a, b) => b.lastEdited - a.lastEdited)
                );
            } else {
                setNotes([]);
            }
        });
    };

    const handleDeleteNote = async (id: string) => {
        if (!user) return;
        const db = getDatabase();
        await remove(ref(db, `notes/${user.uid}/${id}`));
    };

    const handleSaveNote = async (id: string, title: string, body: string) => {
        if (user) {
            const note = { id, title, body, lastEdited: Date.now() };
            await updateNote(user.uid, note);
            fetchNotes();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <Compose onNoteAdded={fetchNotes} />
            {notes.map((note) => (
                <Card
                    key={note.id}
                    title={note.title}
                    body={note.body}
                    onClose={() => handleDeleteNote(note.id)}
                    onSave={(title, body) =>
                        handleSaveNote(note.id, title, body)
                    }
                />
            ))}
        </div>
    );
}

export default CardList;
