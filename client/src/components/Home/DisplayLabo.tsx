import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getLabos } from "../../api/labo";
import CircularProgress from '@mui/material/CircularProgress';
import { ClassNames } from "@emotion/react";

type LaboType = {
    labo_id: number;
    name: string;
    prof: string;
    prof_email: string;
    description: string;
    prerequisites: string;
    room_number: string;
    student_field: string[];
};

export const DisplayLabo: React.FC = () => {
    const [labo, setLabo] = useState<Array<LaboType>>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [field, setField] = useState<string>("");

    const itemsPerPage = 8;
    const navi = useNavigate();

    useEffect(() => {
        const fetchLabo = async () => {
            try {
                const res = await getLabos();
                if (field === "") {
                    setLabo(res);
                } else {
                    const filteredLabo = res.filter((item: LaboType) => {
                        return item.student_field.includes(field);
                    })
                    setLabo(filteredLabo);
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchLabo();
    }, [field]);

    const handleLaboClick = (labo_id: number) => {
        navi(`/labo/${labo_id}`);
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = labo.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(labo.length / itemsPerPage);

    if (!labo.length) {
        return <CircularProgress sx={{ textAlign: "center", display: "block", margin: "0 auto" }} />
    }
    return (
        <div className=" bg-white">
            <div className="bg-white flex flex-col">
                <div className="m-2 p-5 flex justify-center space-x-3">
                    <button className={`w-[10%] bg-sky-200 shadow-lg ${field === "" ? 'text-indigo-500' : 'text-gray-600'}`} onClick={() => setField("")}>All</button>
                    <button className={`w-[10%] bg-sky-200 shadow-lg ${field === "CS" ? 'text-indigo-500' : 'text-gray-600'}`} onClick={() => setField("CS")}>CS</button>
                    <button className={`w-[10%] bg-sky-200 shadow-lg ${field === "IT-SPR" ? 'text-indigo-500' : 'text-gray-600'}`} onClick={() => setField("IT-SPR")}>IT-SPR</button>
                    <button className={`w-[10%] bg-sky-200 shadow-lg ${field === "IT-CMV" ? 'text-indigo-500' : 'text-gray-600'}`} onClick={() => setField("IT-CMV")}>IT-CMV</button>
                    <button className={`w-[10%] bg-sky-200 shadow-lg ${field === "SY" ? 'text-indigo-500' : 'text-gray-600'}`} onClick={() => setField("SY")}>SY</button>
                    <button className={`w-[10%] bg-sky-200 shadow-lg ${field === "SE-DE" ? 'text-indigo-500' : 'text-gray-600'}`} onClick={() => setField("SE-DE")}>SE-DE</button>
                </div>
                {currentItems.map((item, index) => (
                    <div key={index} className="flex m-2 ml-[25%] border-b-4  text-center w-[50%] p-2 text-black cursor-pointer hover:bg-gray-500 hover:text-sky-200"
                        onClick={() => handleLaboClick(item.labo_id)}
                    >
                        <div className="flex-1">{item.prof}</div>
                        <div className="flex-1">{item.name}</div>
                        <div className="flex-1">{item.student_field + ""}</div>
                    </div>
                ))}
            </div >
            <div className="bg-white flex justify-center mt-4">
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        className={`mr-2 ${currentPage === index + 1 ? 'text-indigo-500' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    )
}
