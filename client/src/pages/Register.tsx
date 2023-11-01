import React, { FormEvent, useState } from "react"
import { register } from "../api/user"
import { verlifyEmail } from "../api/auth";

export const Register: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [pwd, setPwd] = useState<string>();
    const [grade, setGrade] = useState<number>();
    const [field_of_interest, setField_of_interest] = useState<string>();
    const [labo_id, setLabo_id] = useState<number>();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await register(email ?? "", pwd ?? "", grade ?? 0, field_of_interest ?? "", labo_id ?? 0);
            console.log(res);
            alert("認証コードをemailに送りました。認証をお願いします");
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    return (
        <>
            <div className="bg-teal-50 flex h-screen w-screen overflow-hidden flex-col justify-center">

                <form onSubmit={handleRegister} className="p-10">
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value as string)} /><br />
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black" type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value as string)} /><br />
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black" type="grade" placeholder="grade" value={grade} onChange={e => setGrade(Number(e.target.value))} /><br />
                    {
                        grade != undefined && grade >= 3 ? <input className="m-5 p-2 bg-teal-200 rounded-lg text-black" type="labo_id" placeholder="labo" value={labo_id} onChange={e => setLabo_id(Number(e.target.value))} /> : <></>

                    }
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black" type="field_of_interest" placeholder="field_of_interest" value={field_of_interest} onChange={e => setField_of_interest(e.target.value as string)} /><br />
                    <button className="m-5 pr-28 bg-teal-500" type="submit">register</button>
                </form>
            </div>
        </>
    )
}