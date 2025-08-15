import React from 'react'

const VehiclePanel = (props) => {

    console.log(props.value)
    return (
        <div>


            <div

                onClick={() => {
                    props.setConfirmedRidePanel(true);
                    props.setVehiclePanel(false);
                }}

                className=" border-2 rounded-xl border-gray-800 w-full flex items-center justify-between bg-white mt-4">


                <img className="w-36 h-16" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5O2PVmKwYLyptJf2j6AwLaJ8XiBAVt7Z8Cw&s" />

                <div className="">

                    <h4 className="font-medium text-base">UberGo <span><i className="ri-user-fill"></i></span>4</h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-normal text-sm">Affordable compact rides</p>

                </div>

                <h2 className="text-{10px} font-semibold">Rs-192.20</h2>

            </div>


            <div

                onClick={() => {
                    props.setConfirmedRidePanel(true);
                    props.setVehiclePanel(false);
                }}

                className=" border-2 rounded-xl border-gray-800 w-full flex items-center justify-between bg-white mt-4">

                <img className="w-36 h-16" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" />

                <div className="">

                    <h4 className="font-medium text-base">Uber Auto <span><i className="ri-user-fill"></i></span>3</h4>
                    <h5 className="font-medium text-sm">12 mins away</h5>
                    <p className="font-normal text-sm">Affordable compact rides</p>

                </div>

                <h2 className="text-{10px} font-semibold">Rs-200.20</h2>

            </div>


            <span onClick={() => {
                props.setVehiclePanel(false);
            }} className="ml-44"><i class="ri-arrow-down-wide-fill"></i></span>


        </div>
    )
}

export default VehiclePanel;
