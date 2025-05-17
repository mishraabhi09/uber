import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const CaptainSignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [captaindata, setCaptainData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        setCaptainData({

            username: {
                firstname: firstname,
                lastname: lastname

            }
            ,
            email: email,
            password: password
        })

        console.log(captaindata);

        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");

    }



    return (
        <div>
            <div>

                <img className="w-20 ml-6 mt-6 " src="https://www.svgrepo.com/show/505031/uber-driver.svg" />

                <form className="mt-2" onSubmit={(e) => {
                    submitHandler(e);
                }}>



                    <p className="text-xl ml-6">What's Our captain name</p>

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
                        Login

                    </button>

                </form>

                <p className="text-green-500 mt-4 ml-10 text-lg font-semibold">Already have a account? <Link to="/captainlogin" className="text-sky-600">Login here</Link></p>

            </div >


            <div>

                <p className="ml-10 mr-7 mt-5 text-[11px] line-tight font-sans font-medium">
                    This site is protected by reCAPTCHA and the  <span className="text-sky-600 hover:underline hover:cursor-pointer">Google Privacy Policy</span> and <span className="text-sky-600 hover:cursor-pointer hover:underline">Terms of Service</span> apply.
                </p>
            </div>
        </div>
    )
}

export default CaptainSignUp;