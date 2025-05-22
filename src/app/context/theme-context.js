"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (saved === "dark" || (saved === null && prefersDark)) {
        setDarkMode(true);
        } else {
        setDarkMode(false);
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
        } else {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <ThemeContext.Provider value={[darkMode, setDarkMode]}>
        {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
