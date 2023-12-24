import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import UserOfficerRecords from "./pages/usermodule/officer.jsx";
import UserReport from "./pages/usermodule/report.jsx";
import UserProfile from "./pages/usermodule/profile.jsx";

const router = createBrowserRouter([
    // Login / index route
    {
        path: "/",
        element: <App />,
    },
    // usermodule routes
    {
        path: "/Dashboard",
        element: <Dashboard />,
    },
    {
        path: "/userOfficerRecords",
        element: <UserOfficerRecords />,
    },
    {
        path: "/userReport",
        element: <UserReport />,
    },
    {
        path: "/userProfile",
        element: <UserProfile />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
