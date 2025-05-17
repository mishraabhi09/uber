import react from 'react';
import { Link } from "react-router-dom";
import { useState } from "react"

const Userlogin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userdata, setUserData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        setUserData({
            email: email,
            password: password
        })

        console.log(userdata);

        setEmail("");
        setPassword("");
    }

    return (
        <div>
            <div>

                <img className="w-20 ml-6 mt-6 " src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" />

                <form className="mt-5" onSubmit={(e) => {
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

                <p className="text-green-500 mt-4 ml-14 text-lg font-semibold">New here? <Link to="/usersignup" className="text-sky-600">Create new account </Link></p>

            </div >


            <div>

                <Link to="/captainlogin" className=" flex items-center justify-center border mt-56 ml-6 py-2 w-80 placeholder:text-base px-2 rounded-lg bg-[#10b440] text-white font-semibold">
                    Sign in as Captain
                </Link>

            </div>
        </div>
    )
}

export default Userlogin;
