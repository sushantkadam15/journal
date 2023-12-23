import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/preflight.css';
import './styles/index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { MenuProvider } from './contexts/NavDrawerContext.jsx';

ThemeProvider;
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <MenuProvider>
                <App />
            </MenuProvider>
        </ThemeProvider>
    </React.StrictMode>
);
