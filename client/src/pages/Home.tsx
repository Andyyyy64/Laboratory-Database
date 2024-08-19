import React, { useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

import { getme } from "../api/user"

import CircularProgress from '@mui/material/CircularProgress';

import { Header } from "../components/Home/Header"
import { DisplayLabo } from "../components/Home/DisplayLabos";

type UserType = {
    id: number;
    student_id: string;
    email: string;
    grade: number;
    field_of_interest: string;
    labo_id: number;
    created_at?: Date;
    liked_labos?: number[];
};



export const Home: React.FC = () => {
    const [user, setUser] = useState<UserType>();
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
      }, [navi])
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getme();
                setUser(res.user);
                localStorage.setItem("user_id", res.user.id);
                localStorage.setItem("grade", res.user.grade);
                localStorage.setItem("email", res.user.email);
                if (res.user.labo_id != null) {
                    localStorage.setItem("labo_id", res.user.labo_id);
                }
                if (res.user.field_of_interest != null) {
                    localStorage.setItem("field_of_interest", res.user.field_of_interest);
                }
                localStorage.setItem("created_at", res.user.created_at);
            } catch (err) {
                console.log(err);
                alert(err);
            }
        }
        fetchUser();
    }, [])


    if (!user) {
        return <CircularProgress sx={{ textAlign: "center" }} />
    }

    return (
        <>
            <div className=" bg-white h-screen w-screen">
                <Header />
                <DisplayLabo />
            </div>
        </>
    )
}