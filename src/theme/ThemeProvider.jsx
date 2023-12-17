import React, { createContext, useState } from 'react';
import lightTheme from './light.json';
import darkTheme from './dark.json';

// Create a context with default value
export const ThemeContext = createContext({
    theme: lightTheme,
    toggleTheme: () => {}
});

// Create a provider component
 const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === lightTheme ? darkTheme : lightTheme
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;