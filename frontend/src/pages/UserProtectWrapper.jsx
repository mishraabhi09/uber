import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const UserProtectWrapper = ({
    children
}) => {

    const [token, setToken] = useState(() => localStorage.getItem("token"));

    console.log(token);

    const navigate = useNavigate();

    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    

    useEffect(() => {
        if (!token) {
            navigate("/userlogin");

        }
    }, [token, navigate])

    return (

        <div>


            {children}

        </div>
    )

}

export default UserProtectWrapper;
