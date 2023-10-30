import { useState } from 'react'
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login"

export const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}
