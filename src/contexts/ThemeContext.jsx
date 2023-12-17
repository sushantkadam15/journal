// ThemeContext.js

import React, { createContext, useState, useContext, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import lightTheme from '../themes/light.json';
import { lightDefaultTheme, darkDefaultTheme } from '@blocknote/react';

// Create a context for theme
const ThemeContext = createContext();

// ThemeProvider component that provides theme-related values and functions to its children
export const ThemeProvider = ({ children }) => {
    // Get the initial theme value from localStorage or use false as default
    const initialTheme = localStorage.getItem('isDarkMode') === 'true';
    const [isDarkMode, setIsDarkMode] = useState(initialTheme);

    // Function to toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            localStorage.setItem('isDarkMode', String(!prevMode));
            return !prevMode;
        });
    };

    useEffect(() => {
        // Add or remove the 'dark' class based on whether dark mode is enabled
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const darkTheme = {
        ...lightTheme,
        token: {
            ...lightTheme.token,
            colorPrimary: '#7c7065',
            colorInfo: '#7c7065',
            colorSuccess: '#5dfdcb',
            colorWarning: '#ffd791',
            colorTextBase: '#f5f5f5',
            colorBgBase: '#373737'
        }
    };

    // Choose theme based on whether dark mode is enabled
    const theme = isDarkMode ? darkTheme : lightTheme;

    // Customize the light and dark themes
    const lightBlockNoteTheme = {
        ...lightDefaultTheme,
        fontFamily: 'JetBrains Mono, monospace',
        borderRadius: 0
    };
    const darkBlockNoteTheme = {
        ...darkDefaultTheme,
        fontFamily: 'JetBrains Mono, monospace',
        borderRadius: 0,
        colors: {
            ...darkDefaultTheme.colors,
            editor: {
                text: '#F5F5F5',
                background: '#373737'
            }
        }
    };

    const blockNoteTheme = isDarkMode
        ? darkBlockNoteTheme
        : lightBlockNoteTheme;

    // Configuration for antd
    const antdConfig = {
        theme
    };

    // Provide theme-related values and functions to children
    return (
        <ThemeContext.Provider
            value={{ isDarkMode, blockNoteTheme, toggleDarkMode }}
        >
            <ConfigProvider {...antdConfig}>{children}</ConfigProvider>
        </ThemeContext.Provider>
    );
};

// Custom hook to use theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        // If useTheme is used outside a ThemeProvider, throw an error
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
