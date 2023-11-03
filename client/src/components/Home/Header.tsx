import React from "react";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
    const navi = useNavigate();

    const handleLaboClick = (labo_id: number) => {
        navi(`/labo/${labo_id}`);
    }

    const handleProfileClick = (user_id: number) => {
        navi(`/profile/${user_id}`);
    }

    return (
        <>
            <div className="bg-cover bg-white p-10 flex justify-between items-center">
                <a href="/"><h1 className="logo">LABORATORY<br /> DATABASE</h1></a>
                <div className="flex space-x-4">
                    <a href="/" className="zoo">TOP</a>
                    <a onClick={() => handleProfileClick(Number(localStorage.getItem('user_id')))} className="zoo">PROFILE</a>
                    {
                        localStorage.getItem("labo_id") ? (
                            <a onClick={() => handleLaboClick(Number(localStorage.getItem('labo_id')))} className=" zoo text-black font-bold cursor-pointer hover:text-blue">MYLABO</a>
                        ) : <></>
                    }
                </div>
            </div>
        </>
    )
}
