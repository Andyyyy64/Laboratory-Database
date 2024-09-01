import React, { useState } from "react";
import { verlifyEmail } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/useLoading";
import CircularProgress from "@mui/material/CircularProgress";

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
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('./assets/background.png')] bg-center bg-no-repeat bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 space-y-6">
        <form onSubmit={handleVerify} className="space-y-6">
          {email === null && (
            <input
              className="w-full p-2 bg-teal-200 rounded-lg text-black shadow-lg"
              type="email"
              placeholder="Email"
              value={email ?? ""}
              onChange={(e) => setEmail(e.target.value as string)}
            />
          )}
          <input
            className="w-full p-2 bg-teal-200 rounded-lg text-black shadow-lg"
            type="text"
            placeholder="Verity Code"
            value={verlifyCode ?? ""}
            onChange={(e) => setVerlifyCode(Number(e.target.value))}
          />
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <button
              className="w-full p-2 bg-teal-200 rounded-lg text-black shadow-lg"
              type="submit"
            >
              Verify
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
