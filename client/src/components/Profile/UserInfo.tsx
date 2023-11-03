import React from "react";

type Props = {
    id: number | undefined;
    student_id: string | undefined;
    email: string | undefined;
    grade: number | undefined;
    field_of_interest?: string | undefined;
    labo_id?: number | undefined;
    created_at: Date | undefined;
};

export const UserInfo: React.FC<Props> = ({ student_id, email, grade, field_of_interest }) => {


    return (
        <>
            <div className="bg-white">
                <div className="text-center">
                    <h1 className="text-black mb-10">PROFILE</h1>
                    <h2 className="text-black text-xl mb-5">Your email: {email}</h2>
                    <h2 className="text-black text-xl mb-5">Your Grade: {grade}</h2>
                    <h2 className="text-black text-xl mb-5">Your Student ID: {student_id}</h2>
                    <h2 className="text-black text-xl mb-5">Your Field of Interest: {field_of_interest}</h2>
                </div>
            </div>
        </>
    )
}