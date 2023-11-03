import React, { useState, useEffect } from "react"

import { getme } from "../api/user"

import CircularProgress from '@mui/material/CircularProgress';

import { Header } from "../components/Home/Header"
import { DisplayLabo } from "../components/Home/DisplayLabo";

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
                if (res.user.liked_labos != null) {
                    localStorage.setItem("liked_labos", res.user.liked_labos);
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