// components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProtectedRoute = () => {
    const { currentUser } = useContext(UserContext);

    // If not logged in → redirect to login
    if (currentUser?.accessToken === null || currentUser?.accessToken === undefined) 
    {
        return <Navigate to="/login" replace />;
    }

    // If logged in → render the child route
    return <Outlet />;
};

export default ProtectedRoute;
