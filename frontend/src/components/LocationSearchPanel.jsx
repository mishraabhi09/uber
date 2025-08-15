import React from 'react'

const LocationSearchPanel = (props) => {


    console.log(props);
    // Sample search Array for location -->>

    const locations = [


        "Terminal 2 , Bengaluru , Gangamuthanhalli , karnataka",



        "BMS Institute of Technology and Management , Doddadaballapura Main Rd , Yelahanka, Avalahalli",



        "Omega Multispeciality Hospital, NO.1236 WARD NO:4 BSECTOR Bengaluru, karnataka",




        "Hotel Aman Inn, 96/2, 3th Rajiv Nagar, near Railway Station",



        "Presidency University , Itgalpur Rajanna palace, Near kapoor's cafe, Rajasthan",

    ]



    return (
        <div>

            {/* <div className="flex items-center justify-start my-2 gap-4 border-2 border-black rounded-2xl p-2">
                <h2 className="bg-[#eeeeee] border rounded-full w-15 h-15 p-3"><i class="ri-map-pin-fill"></i></h2>
                <h4 className="text-[13px] text-slate-700 font-sans font-semibold">Terminal 2 , Bengaluru , Gangamuthanhalli , karnataka</h4>
            </div>


            <div className="flex items-center justify-start my-4 gap-4 border-2 border-black rounded-2xl p-2">
                <h2 className="bg-[#eeeeee] border rounded-full w-15 h-15 p-3"><i class="ri-school-line"></i></h2>
                <h4 className="text-[13px] text-slate-700 font-sans font-semibold">BMS Institute of Technology and Management , Doddadaballapura Main Rd , Yelahanka, Avalahalli</h4>
            </div>


            <div className="flex items-center justify-start my-4 gap-4 border-2 border-black rounded-2xl p-2">
                <h2 className="bg-[#eeeeee] border rounded-full w-15 h-15 p-3"><i class="ri-hospital-line"></i></h2>
                <h4 className="text-[13px] text-slate-700 font-sans font-semibold">Omega Multispeciality Hospital, NO.1236 WARD NO:4 BSECTOR Bengaluru, karnataka</h4>
            </div>


            <div className="flex items-center justify-start my-4 gap-4 border-2 border-black rounded-2xl p-2">
                <h2 className="bg-[#eeeeee] border rounded-full w-15 h-15 p-3"><i class="ri-hotel-line"></i></h2>
                <h4 className="text-[13px] text-slate-700 font-sans font-semibold">Hotel Aman Inn, 96/2, 3th Rajiv Nagar, near Railway Station</h4>
            </div>


            <div className="flex items-center justify-start my-2 gap-4 border-2 border-black rounded-2xl p-2">
                <h2 className="bg-[#eeeeee] border rounded-full w-15 h-15 p-3"><i class="ri-community-fill"></i></h2>
                <h4 className="text-[13px] text-slate-700 font-sans font-semibold">Presidency University , Itgalpur Rajanna palace, Near kapoor's cafe, Rajasthan</h4>
            </div> */}




            {
                locations.map(function (elem) {
                    return <div

                        onClick={() => {
                            props.setOpenPanel(false);
                            props.setVehiclePanel(true);

                        }}

                        className="flex items-center justify-start my-2 gap-4 border-2 border-black rounded-2xl p-2" >
                        <h2 className="bg-[#eeeeee] border rounded-full w-15 h-15 p-3"><i class="ri-map-pin-fill"></i></h2>
                        <h4 className="text-[13px] text-slate-700 font-sans font-semibold">{elem}</h4>
                    </div>
                })
            }

        </div >
    )
}
export default LocationSearchPanel;