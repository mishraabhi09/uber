import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (

        <div>
            <div className="h-screen pt-8 w-full flex justify-between flex-col bg-cover bg-center bg-[url(https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_1152,w_1152/v1683919251/assets/42/a29147-e043-42f9-8544-ecfffe0532e9/original/travel-ilustra.png)]">

                <img className="w-20 ml-8" src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" />

                <div className="bg-white py-6">
                    <h2 className=" text-2xl text-black font-bold px-5">Get Started with Uber</h2>
                    <Link to="/Userlogin" className="text-2xl bg-black text-white px-28 py-2 rounded-xl ml-4 mr-4 mt-5 flex justify-center items-center">continue</Link>
                </div>

            </div>
        </div >
    )
}

export default Home;
