import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import { useNavigate } from "react-router-dom";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel.jsx";
import ConfirmedRidePanel from "../components/confirmedRidePanel.jsx";
import WaitforDrivers from "../components/waitforDrivers.jsx"
import LookingforDrivers from "../components/LookingforDrivers.jsx";


const start = () => {


    const [pickupLocation, setPickUpLocation] = useState("");
    const [enterDestination, setEnterDestination] = useState("");
    const [openPanel, setOpenPanel] = useState(false);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmedRidePanel, setConfirmedRidePanel] = useState(false);
    const [Vehiclefound, setVehicleFound] = useState(false);
    const panelRef = useRef(null);
    const VehiclePanelRef = useRef(null);
    const ConfirmedRidePanelRef = useRef(null);
    const VehicleFoundRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
    }

    useGSAP(() => {
        if (openPanel) {
            gsap.to(panelRef.current, {
                height: "72%"
            })
        }
        else {
            gsap.to(panelRef.current, {
                height: "0%"
            })
        }
    }, [openPanel])



    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(VehiclePanelRef.current, {
                transform: "translateY(0)"
            })
        }
        else {
            gsap.to(VehiclePanelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [vehiclePanel])




    useGSAP(function () {
        if (confirmedRidePanel) {
            gsap.to(ConfirmedRidePanelRef.current, {
                transform: "translateY(0)"
            })
        }
        else {
            gsap.to(ConfirmedRidePanelRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [confirmedRidePanel])



    useGSAP(function () {
        if (Vehiclefound) {
            gsap.to(VehicleFoundRef.current, {
                transform: "translateY(0)"
            })
        }
        else {
            gsap.to(VehicleFoundRef.current, {
                transform: "translateY(100%)"
            })
        }
    }, [Vehiclefound])


    return (


        <div className="h-screen relative overflow-hidden">

            <img className="w-20 absolute left-5 top-5 " src="https://logos-world.net/wp-content/uploads/2020/05/Uber-Logo.png" alt="uber logo " />


            <div className="w-screen h-screen ">
                <img className="h-full w-full object-fit" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="map image" />
            </div>



            <div className="absolute top-0 w-full h-screen flex flex-col justify-end">



                <div className="h-[36%] p-4 bg-white">


                    <h5 className="absolute right-6">
                        <i onClick={() => {
                            setOpenPanel(false);
                        }} className="ri-arrow-down-wide-line"></i>
                    </h5>


                    <h4 className="font-semibold text-2xl pb-4">Find a trip</h4>

                    <form onSubmit={(e) => {
                        submitHandler(e);
                    }}>

                        <input

                            className="border px-4 py-2 rounded-lg bg-[#eeeeee] mb-4 w-full " type="text"
                            placeholder="Add a pick-up location"
                            value={pickupLocation}
                            onChange={(e) => {
                                setPickUpLocation(e.target.value);
                            }}
                            onClick={() => {
                                setOpenPanel(true);
                            }}

                        />

                        <input

                            className="border px-4 py-2 rounded-lg bg-[#eeeeee] w-full " type="text"
                            placeholder="Enter your destination"
                            value={enterDestination}
                            onChange={(e) => {
                                setEnterDestination(e.target.value);
                            }}
                            onClick={() => {
                                setOpenPanel(true);
                            }}


                        />

                    </form>

                </div>


                <div ref={panelRef} className="h-[0%] pl-4 pr-4 w-full bg-white overflow-hidden">
                    <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} setOpenPanel={setOpenPanel} />
                </div>






            </div >


            <div ref={VehiclePanelRef} className="fixed w-full z-10 bottom-0 px-3 translate-y-full  h-60">

                <VehiclePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehiclePanel={setVehiclePanel} />

            </div>

            <div ref={ConfirmedRidePanelRef} className="fixed w-full z-10 bottom-0 px-3 translate-y-full  h-60">

                <ConfirmedRidePanel setConfirmedRidePanel={setConfirmedRidePanel} setVehicleFound={setVehicleFound} />

            </div>


            <div ref={VehicleFoundRef} className="fixed w-full z-10 bottom-0 px-3 translate-y-full  h-60">

                <LookingforDrivers setVehicleFound={setVehicleFound} />

            </div>


        </div >
    )
}

export default start;