import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "grid-pattern":
                    "linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)",
            },
            colors: {
                text: "var(--text)",
                background: "var(--background)",
                primary: "var(--primary)",
                secondary: "var(--secondary)",
                accent: "var(--accent)",
                card: {
                    bg: "var(--cardBg)",
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
