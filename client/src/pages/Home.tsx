import React, { useEffect, useContext } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import CircularProgress from '@mui/material/CircularProgress';

import { Header } from "../components/Home/Header"
import { DisplayLabo } from "../components/Home/DisplayLabos";

import { AuthContext } from "../context/authContext";

export const Home: React.FC = () => {
    const authContext = useContext(AuthContext);
    if (authContext === undefined) {
      throw new Error("useAuth must be used within a AuthProvider");
    }
    const { user } = authContext; 
    const navi = useNavigate();
    
    const isTokenExpired = (token: string) => {
        const decoded: { exp: number } = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
      }
    
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        alert("Your session has expired. Please log in again.");
        navi("/login");
      }
    }, [navi]);
    
    useEffect(() => {
      if (!user) {
        navi("/login");
      }
    }, [user, navi]);


    return (
      <div className=" bg-white h-screen w-screen">
        {user !== undefined ? (
          <>
            <Header />
            <DisplayLabo />
          </>
        ) : (
            <div className=" text-center relative">
                <div className=" absolute top-32 left-[45%]">
                    <h1 className=" text-black mb-10">Now Loading...</h1>
                    <CircularProgress />
                </div>
            </div>
        )}
      </div>
    );
}