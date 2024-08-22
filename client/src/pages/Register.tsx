import React, { FormEvent, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useLoading } from "../hooks/useLoading";
import { register } from "../api/user"
import { getLabosByProf, getAllProfName } from "../api/labo";

import Tooltip from "@mui/material/Tooltip";

type ProfType = {
    prof: string;
}

export const Register: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [grade, setGrade] = useState<string>('1');
    const [field_of_interest, setField_of_interest] = useState<string>("");
    const [labo_id, setLabo_id] = useState<number | undefined>();
    const [professors, setProfessors] = useState<string[]>([]);
    const [pwd, setPwd] = useState<string>("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false); 
    const [confirmPwdTouched, setConfirmPwdTouched] = useState<boolean>(false);

    const { loading, startLoading, stopLoading } = useLoading();
    const [isFormValid, setIsFormValid] = useState<boolean>(false);

    const navi = useNavigate();

    useEffect(() => {
        setIsFormValid(
            email.trim() !== "" &&
            grade !== undefined &&
            !isNaN(Number(grade)) &&
            pwd.trim() !== "" &&
            confirmPwd.trim() !== "" &&
            pwd === confirmPwd 
        );
    }, [email, pwd, confirmPwd, grade]);

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

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            alert("Please fill in all fields correctly.");
            return;
        }
        startLoading();
        try {
            const res = await register(email, pwd, Number(grade) ?? 0, field_of_interest, labo_id ?? null);
            if (localStorage.getItem("email") == null) {
                localStorage.setItem("email", email);
            }
            console.log(res);
            alert("認証コードをemailに送りました。認証をお願いします");
            stopLoading();
            navi("/verify");
        } catch (err: unknown) {
            if (typeof err === "object" && err !== null && "response" in err) {
                const apiError = err as { response: { data: string } };
                alert(apiError.response.data);
            } else {
                alert("An error occurred.");
            }
            stopLoading();
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
            <div className="bg-cover h-screen w-screen flex sm:flex-row space-x-72 justify-center xl:bg-[url('./assets/background.png')] relative">

                <form onSubmit={handleRegister} className="pt-64 pl-8 space-y-8 absolute right-32">
                    <input
                        className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="email"
                        placeholder="Email" value={email} onChange={e => setEmail(e.target.value as string)}
                    /><br />
                    <Tooltip title="Grade" placement="top" arrow>
                        <select
                            className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg w-[100px]"
                            value={grade}
                            onChange={e => setGrade(e.target.value)}
                        >
                            {Array.from({ length: 8 }, (_, i) => i + 1).map((value) => (
                                <option key={value} value={value.toString()}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </Tooltip><br />
                    {
                        email.slice(0, 1) == "m" || Number(grade) >= 3 ? (
                            <>
                                <Tooltip title='pick your labo' placement="top" arrow>
                                    <select className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg"
                                        onChange={e => handleProfChange(e.target.value as string)}
                                    >
                                        {professors.map((professor, index) => (
                                            <option key={index} value={professor}>{professor}</option>
                                        ))}
                                    </select>
                                </Tooltip>
                                <br />
                            </>
                        ) : <></>

                    }
                    <input
                        className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg" type="field_of_interest"
                        placeholder="field-of-interest" value={field_of_interest}
                        onChange={e => setField_of_interest(e.target.value as string)}
                    /><br />
                    <div className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg flex items-center focus-within:ring-2 focus-within:ring-black">
                        <input
                            className="pr-10 bg-teal-200 border-none outline-none"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password" 
                            value={pwd} 
                            onChange={e => setPwd(e.target.value as string)}
                        />
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </div>
                    <div className="m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg flex items-center focus-within:ring-2 focus-within:ring-black">
                        <input
                            className="pr-10 bg-teal-200 border-none outline-none"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password" 
                            value={confirmPwd} 
                            onChange={e => {setConfirmPwd(e.target.value as string); setConfirmPwdTouched(false);}}
                            onBlur={() => setConfirmPwdTouched(true)}
                        />
                        <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        
                    </div>
                    {pwd !== confirmPwd && confirmPwd.trim() !== "" && confirmPwdTouched && (
                        <p className="m-5 p-2 text-red-500">パスワードが一致しません。</p>
                    )}

                    {
                        loading ? (
                            <CircularProgress sx={{ marginLeft: "40%" }} />
                        ) : (
                            <>
                                <button
                                    className={`m-5 p-2 bg-teal-200 rounded-lg text-black shadow-lg ${isFormValid ? "bg-teal-200" : "bg-gray text-gray-400"}`}
                                    type="submit" disabled={!isFormValid}
                                >
                                    register
                                </button>
                                
                            </>
                        )
                    }
                </form>
            </div>
        </>
    )
}