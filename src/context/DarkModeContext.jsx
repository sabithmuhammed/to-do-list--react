import React, { createContext, useState, useEffect, useContext } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Check user's preference from localStorage or system theme
        return localStorage.getItem("dark-mode")
            ? localStorage.getItem("dark-mode") === "true"
            : window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        // Apply the dark mode class to the document
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        // Save the preference in localStorage
        localStorage.setItem("dark-mode", isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode((prevMode) => !prevMode);

    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
};

export const useDarkMode = () => useContext(DarkModeContext);
