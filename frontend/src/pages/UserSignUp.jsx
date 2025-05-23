import React from 'react'
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext.jsx";

const UserSignUp = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");


  const navigate = useNavigate();

  const [userData, setUserData] = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newuser = {
      fullname: {
        firstName: firstname,
        lastName: lastname

      }
      ,
      email: email,
      password: password
    }

    const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

    const response = await axios.post(`${baseURL}/users/register`, newuser);

    console.log(newuser);

    if (response.status === 201 || response.status === 200) {

      const data = response.data;
      setUserData(data?.userData);
      localStorage.setItem("token", data.token);
      navigate("/userlogin");

    }

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");

  }

  return (
    <div>
      <div>

        <img className="w-20 ml-6 mt-6 " src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" />

        <form className="mt-2" onSubmit={(e) => {
          submitHandler(e);
        }}>



          <p className="text-xl ml-6">What's your name</p>

          <input

            required
            className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
            type="text"
            placeholder="FirstName"
            value={firstname}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}

          />

          <input

            required
            className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
            type="text"
            placeholder="LastName"
            value={lastname}
            onChange={(e) => {
              setLastName(e.target.value);
            }}

          />






          <p className="text-xl ml-6 mt-3">What's your Email</p>

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
            Create account

          </button>

        </form>

        <p className="text-green-500 mt-4 ml-10 text-lg font-semibold">Already have a account? <Link to="/userlogin" className="text-sky-600">Login here</Link></p>

      </div >


      <div>

        <p className="ml-10 mr-7 mt-5 text-[11px] leading-tight font-sans font-medium">
          By proceeding , you consent to get calls , whatsapp or sms messages including by automated means , from Uber and  its affiliates to the number provided.
        </p>

      </div>
    </div>
  )
}

export default UserSignUp;
