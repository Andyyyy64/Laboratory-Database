import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        return token != null;
    };

    return isAuthenticated() ? children : <Navigate to="/login" />;
};
