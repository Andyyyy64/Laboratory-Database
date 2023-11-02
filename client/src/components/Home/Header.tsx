import React from "react";

export const Header: React.FC = () => {
    return (
        <>
            <div className="bg-white p-16 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-600">LABORATORY<br /> DATABASE</h1>
                <div className="flex space-x-4">
                    <a href="/" className="text-gray-600 hover:text-black font-bold">HOME</a>
                    <a href="/guide" className="text-gray-600 hover:text-black font-bold">GUIDE</a>
                    <a href="/profile" className="text-gray-600 hover:text-black font-bold">PROFILE</a>
                </div>
            </div>
        </>
    )
}
