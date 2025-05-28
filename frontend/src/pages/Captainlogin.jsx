import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import axios from "axios";
import CaptainHome from "../pages/captainhome.jsx";



const Captainlogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [captaindata, setCaptainData] = useState({});


  const [captain, setCaptain] = useContext(CaptainDataContext);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const CaptainData = {
      email: email,
      password: password
    }

    const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

    const response = await axios.post(`${baseURL}/captains/login`, CaptainData);

    if (response.status === 200 || response.status === 201) {
      const data = response.data;
      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      navigate("/Captainhome");
    }


    console.log(CaptainData);
    setEmail("");
    setPassword("");
  }


  return (
    <div>
      <div>

        <img className="w-20 ml-6 mt-6 " src="https://www.svgrepo.com/show/505031/uber-driver.svg" />

        <form className="mt-2" onSubmit={(e) => {
          submitHandler(e);
        }}>

          <p className="text-xl ml-6">What's your Email</p>

          <input

            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}

            className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
            type="email"
            placeholder="aksah@gmail.com"

          />

          <p className="text-xl ml-6 mt-5">What's your password</p>

          <input

            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
            type="password"
            placeholder="Enter your password"

          />

          <button

            className="border mt-7 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#111] text-white rounded-lg ">
            Login

          </button>

        </form>

        <p className="text-green-500 mt-4 ml-12 text-lg font-semibold">Join a fleet? <Link to="/captainsignup" className="text-sky-600">Register as a Captain </Link></p>

      </div >


      <div>

        <Link to="/userlogin" className=" flex items-center justify-center border mt-48 ml-6 py-2 w-80 placeholder:text-base px-2 rounded-lg bg-[rgba(180,169,16,0.95)] text-white font-semibold">Sign in as User
        </Link>

      </div>
    </div>
  )
}

export default Captainlogin;
