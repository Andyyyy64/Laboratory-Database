import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getLabosById, getAllProfName, getLabosByProf } from "../../api/labo";
import { assginLabo, getAssginLabo } from "../../api/user";

type Props = {
    id: number | undefined;
    student_id: string | undefined;
    email: string | undefined;
    grade: number | undefined;
    field_of_interest?: string | undefined;
    labo_id?: number | undefined;
    created_at: Date | undefined;
};

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

type ProfType = {
    prof: string;
}

export const UserInfo: React.FC<Props> = ({ id, student_id, email, grade, field_of_interest, labo_id }) => {
    const [labo, setLabo] = useState<LaboType>();
    const [professors, setProfessors] = useState<string[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false); // modal for assigning labo ui
    const [laboId, setLabo_id] = useState<number | undefined>(); // labo id for assigning labo function
    const [isAssigned, setIsAssigned] = useState<boolean>(false); // check if user is assigned to labo

    const navi = useNavigate();

    useEffect(() => {
        const fetchLabo = async () => {
            try {
                const res = await getLabosById(labo_id as number);
                setLabo(res);
            } catch (err) {
                console.log(err);
                alert(err);
            }
        }
        fetchLabo();
    }, [localStorage.getItem("labo_id")])

    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                const res = await getAllProfName();
                const names = res.map((profData: ProfType) => profData.prof);
                setProfessors(names);
            } catch (err) {
                console.log(err);
            }
        }
        fetchProfessors();
    }, []);

    useEffect(() => { // check if user is assigned to labo
        const checkAssigned = async () => {
            const assignedLabo = await getAssginLabo(id as number);
            if (assignedLabo != undefined) {
                setIsAssigned(true);
            }
        }
        checkAssigned();
    }, [id]);

    const handleLaboClick = (labo_id: number) => {
        navi(`/labo/${labo_id}`);
    };

    const handleAssignLabo = async () => { // handle the case when user is not assigned to any labo and wants to assign labo
        const userId = Number(localStorage.getItem("id"));
        try {
            const res = await assginLabo(userId, laboId as number);
            localStorage.setItem("labo_id", laboId as unknown as string);
            console.log(res);
            alert("配属先を設定しました");
            setModalOpen(false);
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    const handleProfChange = async (selectedProf: string) => {
        try {
            const res = await getLabosByProf(selectedProf);
            setLabo_id(res[0].labo_id);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <div className="bg-white">
                <div className="text-center">
                    <h1 className="text-black mb-10">PROFILE</h1>
                    <h2 className="text-black text-xl mb-5">email: {email}</h2>
                    <h2 className="text-black text-xl mb-5">Grade: {grade}</h2>
                    <h2 className="text-black text-xl mb-5">Student ID: {student_id}</h2>
                    {
                        isAssigned ? (
                            <h2 className="text-black text-xl mb-5 cursor-pointer hover:text-blue-500"
                                onClick={() => handleLaboClick(labo?.labo_id as number)}>Labo: {labo?.prof}
                            </h2>
                        ) : (
                            <div className="flex justify-center">
                                <h2 className="text-black text-xl mt-1.5 mr-5">配属先は今はありません</h2>
                                {
                                    Number(localStorage.getItem('user_id')) == id && modalOpen ? (
                                        <button className="text-black bg-blue-300 text-sm" onClick={() => handleAssignLabo()}>設定</button>
                                    ) : <button
                                        className={`text-black bg-gray-300 text-sm ${Number(localStorage.getItem('user_id')) == id ? '' : ' hidden'}`}
                                        onClick={() => setModalOpen(!modalOpen)}>配属先を設定
                                    </button>
                                }

                            </div>
                        )
                    }
                    {
                        modalOpen ? (
                            <>
                                <select className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg"
                                    onChange={e => handleProfChange(e.target.value as string)}
                                >
                                    {professors.map((professor, index) => (
                                        <option key={index} value={professor}>{professor}</option>
                                    ))}
                                </select>
                                <br />
                            </>
                        ) : <></>

                    }
                    {
                        field_of_interest ? (
                            <h2 className="text-black text-xl mb-5">Field of Interest: {field_of_interest}</h2>
                        ) : <></>
                    }
                </div>
            </div>
        </>
    )
}