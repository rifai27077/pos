"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaBars, FaSearch, FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/app/context/theme-context"; 

const Navbar = ({ toggleSidebar, setSearch, search }) => {
    const [darkMode, setDarkMode] = useTheme();

    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md px-4 md:px-6 z-40 transition-colors duration-300">
            <div className="flex flex-wrap items-center justify-between h-16 gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <button
                        onClick={toggleSidebar}
                        className="flex items-center justify-center w-10 h-10 text-gray-800 dark:text-white rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 flex-shrink-0"
                    >
                        <FaBars className="text-xl" />
                    </button>

                    <div className="flex-1">
                        <div className="flex w-full">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="flex-grow py-1.5 px-3 rounded-l-full border border-gray-300 dark:border-gray-600 text-xs sm:text-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <button className="bg-blue-600 dark:bg-gray-700 text-white px-3 sm:px-4 rounded-r-full hover:bg-blue-800 dark:hover:bg-gray-800 transition duration-300">
                                <FaSearch className="text-sm sm:text-base" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3 flex-shrink-0">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                        title={darkMode ? "Light Mode" : "Dark Mode"}
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    <Image
                        src="/ai.jpg"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full cursor-pointer"
                    />
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
