import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Captainlogout = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";



    useEffect(() => {
        axios.get(`${baseURL}/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200 || response.status === 201) {
                localStorage.removeItem("token");
                navigate("/captainlogin")
            }
        })
    }, [baseURL, navigate]);

    return (
        <div>
            Captain Logout
        </div>
    )
}

export default Captainlogout;