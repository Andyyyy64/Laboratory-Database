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
    <div className="bg-cover w-32 h-screen md:w-screen flex flex-row space-x-72 bg-[url('./assets/background.png')]" >
      <div></div>
      <div></div>
      <div></div>
      <div></div>

      <div className="pt-56 pl-8 space-y-8">
          <form onSubmit={handleLogin} className="space-y-8">
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value as string)} className="border rounded-lg pr-28 py-3 px-3 mt-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-black shadow-lg" /><br />
            <input type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value as string)} className="border rounded-lg pr-28 py-3 px-3 mt-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-black shadow-lg" /><br />
            <button className="m-5 pr-28 bg-teal-500 shadow-lg" type="submit">Login</button>
          </form>

          <h3 className="p-6 bg-cyan-500 shadow-lg">Don't have an account?</h3>
          <Link className="m-5 pr-16 py-3 px-4 bg-cyan-300 shadow-lg" to="/register">Create Account</Link>
      </div>

      
      
    </div>

  );
};
