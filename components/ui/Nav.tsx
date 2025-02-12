"use client";

import React, { useState, useRef, useEffect } from "react";
import { Contact } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { User } from "firebase/auth";
import { logOut } from "@/lib/firebaseConfig";
import FirebaseAuth from "@/components/FirebaseAuth"; // Assuming you have this component for Firebase Authentication

interface NavProps {
    user: User | null;
}

const Nav = ({ user }: NavProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            setTimeout(() => {
                document.addEventListener("mousedown", handleClickOutside);
            }, 0);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="fixed z-20 top-0 backdrop-blur-md bg-secondary text-text rounded-lg w-full p-4 h-16 flex justify-between items-center px-8">
            <span className="text-lg font-semibold">IdeaBoard</span>
            <div className="flex items-center gap-8 relative">
                <button
                    ref={buttonRef}
                    onClick={() => {
                        setIsMenuOpen((prev) => !prev); // Toggle menu
                    }}
                >
                    <Contact className="text-accent cursor-pointer" />
                </button>
                {isMenuOpen && (
                    <div
                        ref={menuRef}
                        className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md w-48"
                    >
                        <FirebaseAuth />
                    </div>
                )}
                <ThemeToggle />
            </div>
        </div>
    );
};

export default Nav;
