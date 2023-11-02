import React from "react";

export const Header: React.FC = () => {
    return (
        <>
            <div className="bg-cover bg-white p-10 flex justify-between items-center">
                <a href="/"><h1 className="logo">LABORATORY<br /> DATABASE</h1></a>
                <div className="flex space-x-4">
                    <a href="/" className="zoo">TOP</a>
                    <a href="/guide" className="zoo">GUIDE</a>
                    <a href="/profile" className="zoo">PROFILE</a>
                </div>
            </div>
        </>
    )
}
