import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register";

export const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}
