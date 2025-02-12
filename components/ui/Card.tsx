"use client";

import { X, Pencil } from "lucide-react";

interface CardProps {
    title: string;
    body: string;
    onClose?: () => void;
}

const Card = ({ title, body, onClose }: CardProps) => {
    return (
        <div className="w-full max-w-md mx-auto relative p-8 border-2 border-accent rounded-xl bg-card-bg font-mono flex flex-col">
            <button
                className="absolute top-2 right-2 rounded-full z-10 hover:bg-destructive hover:text-destructive-foreground"
                onClick={onClose}
                aria-label="Close"
            >
                <X className="h-4 w-4 text-text" />
            </button>
            <h1 className="text-text pb-4 text-lg font-bold flex gap-16">
                {title}
            </h1>
            <p className="text-text text-base break-words flex-grow">
                {body}
            </p>
        </div>
    );
};

export default Card;
