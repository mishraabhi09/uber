import React from 'react'

const LookingforDrivers = (props) => {
    return (
        <div className="h-full  w-full bg-slate-50">

            <h5

                onClick={function () {
                    props.setVehicleFound(false);
                }}

                className="text-center text-slate-900">
                <i className="ri-arrow-down-wide-fill"></i>

            </h5>

            <h3 className="font-semibold text-slate-950 text-lg ml-8" >Looking for captain</h3>



            <div className="w-full flex flex-col">
                <img className="h-28 mx-8 mt-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s" />


            </div>




        </div >
    )
}

export default LookingforDrivers

