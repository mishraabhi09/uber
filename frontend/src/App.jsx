import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Userlogin from "./pages/Userlogin.jsx";
import UserSignUp from "./pages/UserSignUp.jsx";
import Captainlogin from "./pages/Captainlogin.jsx";
import CaptainSignUp from "./pages/CaptainSignUp.jsx";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/captainlogin" element={<Captainlogin />} />
        <Route path="/captainsignup" element={<CaptainSignUp />} />
      </Routes>
    </div>
  )
}

export default App
