import React, { useState } from "react";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  return (
    <>
      <div className="login">
        <form>
          <input type="email" placeholder="Email" value={email} />
          <input type="password" placeholder="Password" value={pwd} />
          <button type="submit">Login</button>
        </form>
        <h1>Don't have an account?</h1>
        <button>Sign Up</button>
      </div>
    </>
  );
};
