import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Userlogin from "./pages/Userlogin.jsx";
import UserSignUp from "./pages/UserSignUp.jsx";
import Captainlogin from "./pages/Captainlogin.jsx";
import CaptainSignUp from "./pages/CaptainSignUp.jsx";
import UserProtectWrapper from './pages/UserProtectWrapper.jsx';
import Start from "../src/pages/start.jsx";
import { Userlogout } from "../src/pages/Userlogout.jsx";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/userlogin" element={<Userlogin />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/captainlogin" element={<Captainlogin />} />
        <Route path="/captainsignup" element={<CaptainSignUp />} />
        <Route path="/start" element={<UserProtectWrapper>
          <Start />
        </UserProtectWrapper>}
        />

        <Route path="/user/logout" element={

          <UserProtectWrapper>
            <Userlogout />
          </UserProtectWrapper>} />

      </Routes>
    </div>
  )
}

export default App
