import React, { FormEvent, useState } from "react"
import { register } from "../api/user"
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useLoading } from "../hooks/useLoading";

export const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    const [grade, setGrade] = useState<number>();
    const [field_of_interest, setField_of_interest] = useState<string>("");
    const [labo_id, setLabo_id] = useState<number>();
    const { loading, startLoading, stopLoading } = useLoading();
    const navi = useNavigate();

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        startLoading();
        try {
            const res = await register(email, pwd, grade ?? 0, field_of_interest, labo_id ?? 9);
            localStorage.setItem("email", email);
            console.log(res);
            alert("認証コードをemailに送りました。認証をお願いします");
            stopLoading();
            navi("/verify");
        } catch (err: any) {
            console.log(err);
            alert(err.response.data);
            stopLoading();
        }
    }

    return (
        <>
            <div className="bg-cover h-screen w-screen flex sm:flex-row space-x-72 justify-center xl:bg-[url('./assets/background.png')] relative">

                <form onSubmit={handleRegister} className="pt-64 pl-8 space-y-8 absolute right-32">
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value as string)} /><br />
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value as string)} /><br />
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="grade" placeholder="grade" value={grade} onChange={e => setGrade(Number(e.target.value))} /><br />
                    {
                        grade != undefined && grade >= 3 ? (
                            <>
                                <input className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="labo_id" placeholder="labo" value={labo_id} onChange={e => setLabo_id(Number(e.target.value))} /><br />
                            </>
                        ) : <></>

                    }
                    <input className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="field_of_interest" placeholder="field_of_interest" value={field_of_interest} onChange={e => setField_of_interest(e.target.value as string)} /><br />
                    {
                        loading ? (
                            <CircularProgress sx={{ marginLeft: "40%" }} />
                        ) : (
                            <button className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="submit">register</button>
                        )
                    }
                </form>
            </div>
        </>
    )
}