import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/preflight.css";
import "./styles/index.css";
import { ConfigProvider } from "antd";
import theme from "../theme.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
);
