import React, { useState } from "react";
import { verlifyEmail } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";
import CircularProgress from '@mui/material/CircularProgress';

export const Verify: React.FC = () => {
    const [verlifyCode, setVerlifyCode] = useState<number>();
    const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));
    const { loading, startLoading, stopLoading } = useLoading();
    const navi = useNavigate();

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        startLoading();
        try {
            const res = await verlifyEmail(email ?? "", verlifyCode ?? 0);
            console.log(res);
            alert("認証が完了しました。ログインしてください");
            stopLoading();
            navi("/login");
        } catch (err) {
            console.log(err);
            alert(err);
            stopLoading();
        }
    }

    return (
        <>
            <div className="bg-cover h-screen w-screen flex sm:flex-row space-x-72 justify-center xl:bg-[url('./assets/background.png')] relative">
                <div className="pt-56 pl-8 space-y-8 absolute right-32">
                    <form onSubmit={handleVerify}>
                        {
                            localStorage.getItem != null ? <></> : <input className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="email" placeholder="Email" value={email ?? ""} onChange={e => setEmail(e.target.value as string)} />
                        }
                        <input className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="text" placeholder="veritycode" value={verlifyCode} onChange={e => setVerlifyCode(Number(e.target.value))} /><br />
                        {
                            loading ? (
                                <CircularProgress sx={{ marginLeft: "40%" }} />
                            ) : (
                                <button className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="submit">verify</button>
                            )
                        }
                    </form>
                </div>

            </div>
        </>
    )
}