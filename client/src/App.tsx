import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login"
import { Home } from "./pages/Home"
import { Register } from "./pages/Register";
import { Verify } from "./pages/Verify";
import { LaboDetail } from "./pages/LaboDetail";
import { PrivateRoute } from "./components/PrivateRoute";


export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/labo/:id" element={<LaboDetail />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}
