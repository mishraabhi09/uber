// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// const CaptainProtectWrapper = ({
//     children
// }) => {

//     const [token, setToken] = useState(() => localStorage.getItem("token"));

//     console.log(token);

//     const navigate = useNavigate();
//     const [captain, setCaptain] = useState();
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const handleStorage = () => {
//             setToken(localStorage.getItem("token"));
//         };
//         window.addEventListener("storage", handleStorage);
//         return () => window.removeEventListener("storage", handleStorage);
//     }, []);



//     useEffect(() => {
//         if (!token) {
//             navigate("/captainlogin");

//         }
//     }, [token, navigate]);


//     const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000"

//     axios.get(`${baseURL}/captains/profile`, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     }).then(response => {
//         if (response.status === 201 || response.status === 200) {
//             setCaptain(response.data.captain);
//             setIsLoading(false);
//         }
//     }).catch(err => {
//         console.log(err);
//         navigate("/captainlogin")
//     })




//     if (isLoading) {
//         return (
//             <div>Loading...</div>
//         )
//     };

//     return (

//         <div>


//             {children}

//         </div>
//     )

// }

// export default CaptainProtectWrapper;







import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const navigate = useNavigate();
    const [captain, setCaptain] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handleStorage = () => {
            setToken(localStorage.getItem("token"));
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        if (!token) {
            navigate("/captainlogin");
            return;
        }

        const fetchCaptainProfile = async () => {
            try {
                const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000";

                const response = await axios.get(`${baseURL}/captains/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Fixed: was "Authentication"
                    }
                });

                if (response.status === 200 || response.status === 201) {
                    setCaptain(response.data.captain);
                    setIsLoading(false);
                }
            } catch (err) {
                console.log(err);
                localStorage.removeItem("token"); // Clear invalid token
                navigate("/captainlogin");
            }
        };

        fetchCaptainProfile();
    }, [token, navigate]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default CaptainProtectWrapper;
