"use client";

import React from "react";
import Image from "next/image";
import { FaBars, FaSearch } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
    return (
        <div className="h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6">
            <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 text-gray-800 bg-gray-100 rounded-full md:hidden hover:bg-gray-200 transition duration-300"
            >
                <FaBars className="text-xl" />
            </button>

            <div className="flex items-center w-full justify-start ml-4">
                <div className="relative w-4/5 max-w-xs md:max-w-sm lg:max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-10 pl-10 pr-4 rounded-lg text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="hidden md:block text-right">
                    <h3 className="text-sm font-medium text-gray-800">John Doe</h3>
                    <p className="text-xs text-gray-500">Admin</p>
                </div>
                <Image
                    src="/ai.jpg"
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                />
            </div>
        </div>
    );
};

export default Navbar;
