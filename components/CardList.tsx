import React, { useState, useEffect } from "react";
import Card from "./ui/Card";
import { getNotes, deleteNote } from "@/lib/noteHandler";
import { auth } from "@/lib/firebaseConfig";
import Compose from "./ui/Compose";

function CardList() {
    const user = auth.currentUser;
    const [notes, setNotes] = useState<
        { lastEdited: number; id: string; title: string; body: string }[]
    >([]);

    const handleDeleteNote = async (id: string) => {
        if (user) {
            await deleteNote(user.uid, id);
            fetchNotes();
        }
    };

    const fetchNotes = async () => {
        if (user) {
            const storedNotes = (await getNotes(user.uid)) as {
                lastEdited: number;
                id: string;
                title: string;
                body: string;
            }[];
            setNotes(storedNotes.sort((a, b) => a.lastEdited - b.lastEdited));
        }
    };

    useEffect(() => {
        fetchNotes();
        const interval = setInterval(fetchNotes, 1000);
        return () => clearInterval(interval);
    }, [user]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <Compose onNoteAdded={fetchNotes} />
            {notes.map((task) => (
                <Card
                    title={task.title}
                    body={task.body}
                    key={task.id}
                    onClose={() => handleDeleteNote(task.id)}
                />
            ))}
        </div>
    );
}

export default CardList;
