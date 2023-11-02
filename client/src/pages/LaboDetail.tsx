import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { getLabosById } from "../api/labo";

export const LaboDetail: React.FC = () => {
    const [labo, setLabo] = useState<any>();
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
    }, [])

    console.log(labo)

    return (
        <>
        </>
    )
}