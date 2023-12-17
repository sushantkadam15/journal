import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/preflight.css';
import './styles/index.css';
import { ConfigProvider } from 'antd';

import lightTheme from './theme/light.json';
import darkTheme from './theme/dark.json';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ConfigProvider theme={lightTheme}>
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
