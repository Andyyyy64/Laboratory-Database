import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";

interface PrivateRouteProps {
    children: JSX.Element;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const authContext = useContext(AuthContext);
    if (authContext === undefined) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    const { user } = authContext;

    return user ? children : <Navigate to="/login" />;
};
