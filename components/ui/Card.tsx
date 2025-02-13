"use client";

import { X, Edit, Save } from "lucide-react";
import { useState } from "react";

interface CardProps {
    title: string;
    body: string;
    onClose: () => void;
    onSave: (title: string, body: string) => void;
}

const Card = ({ title, body, onClose, onSave }: CardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);
    const [editedBody, setEditedBody] = useState(body);

    const handleSave = () => {
        onSave(editedTitle, editedBody);
        setIsEditing(false);
    };

    return (
        <div className="w-full max-w-md mx-auto relative p-8 border-2 border-accent rounded-xl bg-card-bg font-mono flex flex-col">
            <button
                className="absolute top-2 right-2 rounded-full z-10 hover:bg-destructive hover:text-destructive-foreground"
                onClick={onClose}
                aria-label="Close"
            >
                <X className="h-6 w-6 text-text" />
            </button>
            {isEditing ? (
                <>
                    <input
                        className="text-text pb-4 text-lg font-bold flex gap-16 bg-card-bg outline-none border-b-2 border-text border-dashed"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <textarea
                        className="text-text text-base break-words flex-grow bg-card-bg outline-none border "
                        value={editedBody}
                        onChange={(e) => setEditedBody(e.target.value)}
                    />
                    {/* <button
                        className="absolute bottom-2 right-2 rounded-full z-10 hover:bg-success hover:text-success-foreground"
                        onClick={handleSave}
                        aria-label="Save"
                    >
                        <Save className="h-6 w-6 text-primary" />
                    </button> */}
                    <button
                        className="mt-1 p-2 bg-primary text-primary-foreground rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <h1 className="text-text pb-4 text-lg font-bold flex gap-16">
                        {title}
                    </h1>
                    <p className="text-text text-base break-words flex-grow">
                        {body}
                    </p>
                    <button
                        className="absolute bottom-2 right-2 rounded-full z-10 text-text hover:text-accent"
                        onClick={() => setIsEditing(true)}
                        aria-label="Edit"
                    >
                        <Edit className="h-8 w-8" />
                    </button>
                </>
            )}
        </div>
    );
};

export default Card;
