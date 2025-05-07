import React from "react";
import ReactDOM from "react-dom/client"; // Това е новото място на ReactDOM за версия 18+
import App from "./App";

// Създаване на root с новата API на React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

