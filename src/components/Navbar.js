"use client";

import React from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6">
            {/* Search Bar */}
            <div className="flex items-center w-full md:w-1/2">
                <div className="relative w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-10 pl-10 pr-4 rounded-lg text-black bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    />
                </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                    <div className="text-right hidden md:block">
                        <h3 className="text-sm font-medium text-gray-800">John Doe</h3>
                        <p className="text-xs text-gray-500">Admin</p>
                    </div>
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
