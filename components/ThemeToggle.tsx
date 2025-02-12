"use client";

import { useEffect, useState } from "react";
import Switch from "./ui/Switch";

const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

        document.documentElement.classList.toggle("dark", initialTheme === "dark");
        setTheme(initialTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return <Switch onClick={toggleTheme} />;
};

export default ThemeToggle;
