import React, { useState, useRef } from "react";
import { addNote } from "@/lib/noteHandler";
import { auth } from "@/lib/firebaseConfig";
import generateUniqueId from "@/lib/randomIdGen";
import Alert from "./Alert";

function Compose({ onNoteAdded }: { onNoteAdded: () => void }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [error, setError] = useState<string | null>(null);
    const user = auth.currentUser;

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const resetHeight = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "40px"; 
        }
    };

    const handleSave = async () => {
        if (!title.trim() || !body.trim()) {
            setError("Title and body cannot be empty.");
            setTimeout(() => setError(null), 3000); 
            return;
        }

        if (user) {
            const note = {
                id: generateUniqueId(),
                title,
                body,
                lastEdited: Date.now(),
            };
            await addNote(user.uid, note);
            setTitle("");
            setBody("");
            resetHeight(); 
            onNoteAdded();
        }
    };

    return (
        <div className="w-full max-w-md mx-auto relative p-8 border-2 border-accent rounded-xl bg-card-bg font-mono flex flex-col">
            {error && (
                <Alert
                    text={error}
                    type="danger"
                    duration={3000}
                    className="transition-all ease-in-out"
                />
            )}
            <input
                className="text-text mb-4 text-lg font-bold flex gap-16 bg-card-bg outline-none border-borderC "
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                ref={textareaRef}
                className="text-text text-base break-words bg-card-bg outline-none p-2 border border-borderC 
                rounded-md focus:ring-2 focus:ring-primary resize-none overflow-hidden"
                value={body}
                onChange={(e) => {
                    setBody(e.target.value);
                    adjustHeight();
                }}
                placeholder="Write something..."
                aria-label="Note body"
                rows={1}
                style={{ minHeight: "40px" }}
            />

            <button
                className="mt-4 p-2 bg-primary text-primary-foreground rounded"
                onClick={handleSave}
            >
                Save
            </button>
        </div>
    );
}

export default Compose;
