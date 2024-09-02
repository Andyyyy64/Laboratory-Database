import React, { useState, useContext } from "react";
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useLoading } from "../hooks/useLoading";
import { AuthContext } from "../context/authContext";

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>(
    localStorage.getItem("email") ?? ""
  );
  const [pwd, setPwd] = useState<string>();
  const { loading, startLoading, stopLoading } = useLoading();
  const navi = useNavigate();

  const authContext = useContext(AuthContext);
  if (authContext === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  const { setUser } = authContext;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    try {
      const res = await login(email ?? "", pwd ?? "");
      localStorage.setItem("token", res.token);
      setUser(res.user);
      stopLoading();
      navi("/");
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const apiError = err as { response: { data: string } };
        alert(apiError.response.data);
      } else {
        alert("An error occurred.");
      }
      stopLoading();
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-[url('./assets/background.png')] bg-center bg-no-repeat bg-cover xl:relative">
      <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 xl:absolute xl:right-20">
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value as string)}
            className="w-full border rounded-lg py-3 px-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-black shadow-lg"
          />
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value as string)}
            className="w-full border rounded-lg py-3 px-4 bg-sky-200 border-emerald-200 placeholder-white-500 text-black shadow-lg"
          />
          {loading ? (
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 px-4 bg-cyan-400 text-black rounded-lg shadow-lg"
            >
              Login
            </button>
          )}
        </form>
        <div className="mt-8 text-center">
          {localStorage.getItem("email") == null ? (
            <>
              <h3 className="p-1 text-black rounded-lg">
                Don't have an account?
              </h3>
              <Link
                className="inline-block mt-4 py-2 px-4 bg-cyan-300 shadow-lg text-black rounded-lg"
                to="/register"
              >
                Create Account
              </Link>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
