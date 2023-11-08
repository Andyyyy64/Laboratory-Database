import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getUserById } from "../api/user";

import { Header } from "../components/Home/Header";
import { UserInfo } from "../components/Profile/UserInfo";

import { CircularProgress } from "@mui/material";

type UserType = {
    id: number | undefined;
    student_id: string | undefined;
    email: string | undefined;
    grade: number | undefined;
    field_of_interest?: string | undefined;
    labo_id?: number | undefined;
    created_at: Date | undefined;
};

export const Profile: React.FC = () => {
    const [user, setUser] = useState<UserType>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserById(Number(id));
                setUser(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    })

    if (!user) {
        return (
            <>
                <div className="bg-white h-screen w-screen">
                    <Header />
                    <CircularProgress sx={{ textAlign: "center", display: "block", margin: "0 auto" }} />
                </div>
            </>
        )
    }

    return (
        <>
            <div className="bg-white h-screen w-screen">
                <Header />
                <UserInfo
                    id={user?.id}
                    email={user?.email}
                    student_id={user?.student_id}
                    grade={user?.grade}
                    field_of_interest={user?.field_of_interest}
                    labo_id={user?.labo_id}
                    created_at={user?.created_at} />
            </div>
        </>
    )
}