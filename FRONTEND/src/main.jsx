import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Dashboard, Profile, Transaction } from "./pages/index.js";

const router = createBrowserRouter([
    // Login / index route
    {
        path: "/",
        element: <App />,
    },
    // dashboard module
    {
        path: "/Dashboard",
        element: <Dashboard />,
    },
    // profile module
    {
        path: "/Profile",
        element: <Profile />,
    },
    // treasurer module
    {
        path: "/Transaction",
        element: <Transaction />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
