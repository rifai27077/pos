"use client";

import React from "react";
import Image from "next/image";
import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex justify-between items-center px-4 md:px-6">
            <button
                onClick={toggleSidebar}
                className="flex items-center justify-center w-10 h-10 text-gray-800 rounded-full md:hidden hover:bg-gray-200 transition duration-300"
            >
                <FaBars className="text-xl" />
            </button>

            <div className="flex-1" />

            <div className="flex items-center space-x-4">
                <div className="flex flex-col text-right hidden sm:block">
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
        </nav>
    );
};

export default Navbar;
