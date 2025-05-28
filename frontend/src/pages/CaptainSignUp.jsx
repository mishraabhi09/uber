import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainSignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");



    // Vehicle Specifications---
    const [vehicleColor, setVehicleColor] = useState();
    const [vehicleCapacity, setVehicleCapacity] = useState();
    const [vehiclePlate, setVehiclePlate] = useState();
    const [vehicleType, setVehicleType] = useState();


    const navigate = useNavigate();
    const [captain, setCaptain] = useContext(CaptainDataContext);


    const submitHandler = async (e) => {
        e.preventDefault();

        const Captaindata = {
            fullname: {
                firstName: firstname,
                lastName: lastname
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        };

        const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

        try {
            const response = await axios.post(`${baseURL}/captains/register`, Captaindata);

            if (response.status === 200 || response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem("token", data.token);
                navigate("/captainhome");
            }
            console.log(Captaindata);

            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setVehicleCapacity("");
            setVehicleColor("");
            setVehicleType("");
            setVehiclePlate("");
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };



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

                    <p className="text-xl ml-6 mt-5">Vehicle Information</p>

                    <input
                        required
                        className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
                        type="text"
                        placeholder="Vehicle Color"
                        value={vehicleColor || ""}
                        onChange={(e) => setVehicleColor(e.target.value)}
                    />

                    <input
                        required
                        className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
                        type="text"
                        placeholder="Vehicle Plate"
                        value={vehiclePlate || ""}
                        onChange={(e) => setVehiclePlate(e.target.value)}
                    />

                    <input
                        required
                        className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
                        type="number"
                        min="1"
                        placeholder="Vehicle Capacity"
                        value={vehicleCapacity || ""}
                        onChange={(e) => setVehicleCapacity(e.target.value)}
                    />

                    <input
                        required
                        className="border mt-3 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#eeeeee] rounded-xl"
                        type="text"
                        placeholder="Vehicle Type"
                        value={vehicleType || ""}
                        onChange={(e) => setVehicleType(e.target.value)}
                    />


                    <button

                        className="border mt-7 ml-6 py-2 w-80 placeholder:text-base px-2 bg-[#111] text-white rounded-lg ">
                        Create Captain account

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