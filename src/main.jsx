import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// This connects React app to browser and enables routing
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {/* App is wrapped so we can move between pages */}
    <App />
  </BrowserRouter>
);