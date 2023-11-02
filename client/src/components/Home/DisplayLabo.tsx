import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getLabos } from "../../api/labo";
import CircularProgress from '@mui/material/CircularProgress';

type LaboType = {
    labo_id: number;
    name: string;
    prof: string;
    prof_email: string;
    description: string;
    prerequisites: string;
    room_number: string;
    student_field: string;
};

export const DisplayLabo: React.FC = () => {
    const [labo, setLabo] = useState<Array<LaboType>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 8;
    const navi = useNavigate();

    useEffect(() => {
        const fetchLabo = async () => {
            try {
                const res = await getLabos();
                setLabo(res);
            } catch (err) {
                console.log(err);
            }
        }
        fetchLabo();
    }, []);

    const handleLaboClick = (labo_id: number) => {
        navi(`/labo/${labo_id}`);
    }
console.log(labo);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = labo.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(labo.length / itemsPerPage);

    if (!labo.length) {
        return <CircularProgress sx={{ textAlign: "center", display: "block", margin: "0 auto" }} />
    }

    return (
        <>
            <div className="bg-white flex flex-col">
                {currentItems.map((item, index) => (
                    <div key={index} className="flex bg-gray-200 m-2 ml-[25%] border-gray-200 rounded-full text-center w-[50%] p-2 text-black cursor-pointer hover:bg-gray-500"
                        onClick={() => handleLaboClick(item.labo_id)}
                    >
                        <div className="flex-1">{item.prof}</div>
                        <div className="flex-1">{item.name}</div>
                        <div className="flex-1">{item.student_field}</div>
                    </div>
                ))}
            </div >
            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`mr-2 ${currentPage === index + 1 ? 'text-blue-500' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    )
}
