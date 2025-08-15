import React from 'react'

const confirmedRidePanel = (props) => {
    return (

        <div className="h-full  w-full bg-slate-50">

            <h5

                onClick={function () {
                    props.setConfirmedRidePanel(false);
                }}

                className="text-center text-slate-900">
                <i className="ri-arrow-down-wide-fill"></i>

            </h5>

            <h3 className="font-semibold text-slate-950 text-lg ml-8" >Confirm your Ride</h3>



            <div className="w-full flex flex-col">
                <img className="h-28 mx-8 mt-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s" />

                <button onClick={() => {
                    props.setVehicleFound(true);
                    props.setConfirmedRidePanel(false);
                }}
                    className=" mx-12 mt-4  px-1 py-1 rounded-xl bg-green-600 text-xl font-semibold text-white">Confirm Ride</button>

            </div>




        </div >
    )
}

export default confirmedRidePanel;
