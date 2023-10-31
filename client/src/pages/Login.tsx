import React, { useState } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom"


export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [pwd, setPwd] = useState<string>();
  const navi = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email ?? "", pwd ?? ""); // loginAPIをたたく
      console.log(res);
      // ログインで取得できたユーザーの基本情報をlocalstorageに入れる
      localStorage.setItem("user_id", res.user.id);
      localStorage.setItem("grade", res.user.grade);
      localStorage.setItem("email", res.user.email);
      if (res.user.labo_id != null) {
        localStorage.setItem("labo_id", res.user.labo_id);
      }
      if (res.user.field_of_interest != null) {
        localStorage.setItem("field_of_interest", res.user.field_of_interest);
      }
      localStorage.setItem("created_at", res.user.created_at);

      navi("/"); // ログインが成功したらhomeにリダイレクト
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  return (
    <>
      <div className="bg-teal-50 flex aspect-auto h-screen w-screen overflow-hidden flex flex-col justify-center">

        <form onSubmit={handleLogin} className="p-10">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value as string)} className="border rounded-lg py-3 px-3 mt-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-white" /><br />
          <input type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value as string)} className="border rounded-lg py-3 px-3 mt-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-white" /><br />
          <button className="m-5 bg-teal-500" type="submit">Login</button>
        </form>

        <h1 className="p-10 bg-cyan-500">Don't have an account?</h1>
        <Link to="/register">Sign Up</Link>
      </div>
    </>
  );
};
