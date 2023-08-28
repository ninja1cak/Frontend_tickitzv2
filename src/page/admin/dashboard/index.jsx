import React, { useEffect } from "react";
import charts from '../../../assets/chart.png'
import Header from "../../../component/header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function Admin_Dashboard() {
    const {data} = useSelector((s) => s.users)
    const navigate = useNavigate()
    useEffect(() => {
        document.title = 'Admin Page - Dashboard';
        if(data.data[0].role !== "admin"){
            navigate('/')
        }
    });

    return (
        <>
        <Header />
        {/* Dashboard Admin Start */}
        <div className="bg-gray-200 w-full h-full flex flex-col items-center">
            {/* Container Sales Chart Start */}
            <div className="w-10/12 bg-white p-10 my-5 rounded-lg">
                <h1 className="font-bold ">Sales Chart</h1>
                {/* Button (Sort Movie, Weekly and Filter) Start */}
                <div className="flex gap-3 my-3">
                    {/* Button (Sort Movie, Weekly) Start */}
                    <div className="flex gap-3">
                        {/* Button (Sort Movie) Start */}
                        <div>
                            <select className="bg-gray-50 border-none rounded px-4 py-2 text-xs">
                                <option selected>Movie Name</option>
                            </select>
                        </div>
                        {/* Button (Sort Movie) End */}
                        {/* Button (Weekly) Start */}
                        <div>
                            <select className="bg-gray-50 border-none rounded px-4 py-2 text-xs">
                                <option selected>Weekly</option>
                            </select>
                        </div>
                        {/* Button (Weekly) End */}
                    </div>
                    {/* Button (Sort Movie, Weekly) End */}
                    {/* Button (Filter) Start */}
                    <div className="flex">
                        <button className="flex justify-center items-center text-center bg-[#1D4ED8] text-white text-xs px-6 rounded">
                            Filter
                        </button>
                    </div>
                    {/* Button (Filter) End */}
                </div>
                {/* Button (Sort Movie, Weekly and Filter) End */}
                <div className="w-full">
                    <h1>Avengers: End Game</h1>
                    <img className="w-full" src={charts} alt="charts" />
                </div>
            </div>
            {/* Container Sales Chart End */}
            {/* Container Ticket Sales Start */}
            <div className="w-10/12 bg-white p-10 my-5 rounded-lg">
                <h1 className="font-bold">Ticket Sales</h1>
                    {/* Button (Sort Movie, Weekly and Filter) Start */}
                    <div className="flex gap-3 my-3">
                        {/* Button (Sort Movie, Weekly) Start */}
                        <div className="flex gap-3">
                            {/* Button (Sort Movie) Start */}
                            <div>
                                <select className="bg-gray-50 border-none rounded px-4 py-2 text-xs">
                                    <option selected>Category</option>
                                </select>
                            </div>
                            {/* Button (Sort Movie) End */}
                            {/* Button (Weekly) Start */}
                            <div>
                                <select className="bg-gray-50 border-none rounded px-4 py-2 text-xs">
                                    <option selected>Location</option>
                                </select>
                            </div>
                            {/* Button (Weekly) End */}
                        </div>
                        {/* Button (Sort Movie, Weekly) End */}
                        {/* Button (Filter) Start */}
                        <div className="flex">
                            <button className="flex justify-center items-center text-center bg-[#1D4ED8] text-white text-xs px-6 rounded">
                                Filter
                            </button>
                        </div>
                        {/* Button (Filter) End */}
                    </div>
                    {/* Button (Sort Movie, Weekly and Filter) End */}
                    <div className="w-full">
                        <h1>Avengers: End Game</h1>
                        <img className="w-full" src={charts} alt="charts" />
                    </div>
            </div>
            {/* Container Ticket Sales End */}

        </div>
        {/* Dashoboard Admin End */}
        </>
    )

}

export default Admin_Dashboard