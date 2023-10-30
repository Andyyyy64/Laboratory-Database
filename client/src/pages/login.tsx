import React, { useState } from "react";
import { login } from "../api/auth";


export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [pwd, setPwd] = useState<string>();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email ?? "", pwd ?? "");
      console.log(res);
    } catch(err) {
      console.log(err);
    }
  }
  
  return (
    <>
      <div className="bg-green-500 w-90 h-32 flex rounded">
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value as string)}/>
          <input type="password" placeholder="Password" value={pwd} onChange={e => setPwd(e.target.value as string)}/>
          <button type="submit">Login</button>
        </form>
        
        <h1>Don't have an account?</h1>
        <button>Sign Up</button>
      </div>
    </>
  );
};
