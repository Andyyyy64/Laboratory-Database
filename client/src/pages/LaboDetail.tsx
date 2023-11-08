import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Header } from "../components/Home/Header";
import { LaboInfo } from "../components/Labo/LaboInfo";

import { getLabosById } from "../api/labo";

import { CircularProgress } from "@mui/material";

type LaboType = {
    labo_id: number;
    name: string;
    prof: string;
    prof_email: string;
    description: string;
    prerequisites: string;
    room_number: string;
    student_field: string[];
    liked_number: number;
};

export const LaboDetail: React.FC = () => {
    const [labo, setLabo] = useState<LaboType>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchLabo = async () => {
            try {
                const res = await getLabosById(Number(id));
                setLabo(res);
            } catch (err) {
                console.log(err);
                alert(err);
            }
        }
        fetchLabo();
    }, [id])

    if (!labo) { // i dont know why i implemented loading like this but it works so i'll leave it as it is
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
            <div className=" bg-white h-screen w-screen">
                <Header />
                {
                    labo && <LaboInfo {...labo} />
                }
            </div>
        </>
    )
}