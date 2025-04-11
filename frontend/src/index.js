// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom"; // 👈 import this
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter> {/* 👈 wrap with this */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
