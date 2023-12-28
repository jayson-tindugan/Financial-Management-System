import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
    Forgot,
    Dashboard,
    Officer,
    Transaction,
    Report,
    Profile,
} from "./pages/index.js";

const router = createBrowserRouter([
    // Login / index route
    {
        path: "/",
        element: <App />,
    },

    // Forgot / index route
    {
        path: "/Forgot",
        element: <Forgot />,
    },

    // dashboard module
    {
        path: "/Dashboard",
        element: <Dashboard />,
    },
    // officer record module
    {
        path: "/Officer",
        element: <Officer />,
    },
    // transaction module
    {
        path: "/Transaction",
        element: <Transaction />,
    },
    // report module
    {
        path: "/Report",
        element: <Report />,
    },
    // profile module
    {
        path: "/Profile",
        element: <Profile />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
