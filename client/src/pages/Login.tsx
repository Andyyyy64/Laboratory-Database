import React, { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress';
import { useLoading } from "../hooks/useLoading";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(localStorage.getItem("email") ?? "");
  const [pwd, setPwd] = useState<string>();
  const { loading, startLoading, stopLoading } = useLoading();
  const navi = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    try {
      const res = await login(email ?? "", pwd ?? ""); // loginAPIをたたく
      console.log(res);
      localStorage.setItem("token", res.token);
      stopLoading();
      navi("/"); // ログインが成功したらhomeにリダイレクト
    } catch (err: any) {
      alert(err.response.data);
      stopLoading();
    }
  }

  return (
    <>
      <div className="bg-cover h-screen w-screen flex sm:flex-row space-x-72 justify-center xl:bg-[url('./assets/background.png')] relative" >
        <div className="pt-64 pl-8 space-y-8 absolute right-32">
          <form onSubmit={handleLogin} className="space-y-8">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value as string)} className="border rounded-lg pr-28 py-3 px-3 mt-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-black shadow-lg" /><br />
            <input type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value as string)} className="border rounded-lg pr-28 py-3 px-3 mt-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-black shadow-lg" /><br />
            {
              loading ? (
                <CircularProgress sx={{ marginLeft: "40%" }} />
              ) : (
                <button type="submit" className="m-5 pr-28 py-3 px-4 bg-cyan-400 shadow-lg">login</button>
              )
            }
          </form>
          {
            // adminにアカウント削除されるとローカルストレージに情報残ってる限りCreate account 表示されないジャン　これがBANです、か。
            localStorage.getItem('email') == null ? (
              <>
                <h3 className="p-6 bg-cyan-500 shadow-lg">Don't have an account?</h3>
                <Link className="m-5 pr-16 py-3 px-4 bg-cyan-300 shadow-lg" to="/register">Create Account</Link>
              </>
            ) : <></>
          }
        </div>
      </div>
    </>

  );
};
