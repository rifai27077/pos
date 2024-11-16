"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FaBars,
    FaTachometerAlt,
    FaBox,
    FaCashRegister,
    FaShoppingCart,
    FaChartLine,
    FaCreditCard,
    FaUserFriends,
    FaCog,
} from "react-icons/fa";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const closeSidebar = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button
                onClick={toggleSidebar}
                className="absolute top-4 left-4 z-30 block text-white bg-gelap p-2 rounded-md md:hidden"
            >
                <FaBars className="text-xl" />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gelap text-white transition-transform duration-300 z-20 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 md:block`}
            >
                {/* Logo */}
                <div className="flex items-center justify-center h-20 border-b border-gray-600 px-4">
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/logo-pplg.png"
                            alt="POS Logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <h2 className="text-xl font-semibold">POS System</h2>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="mt-6 space-y-4 px-4">
                    {[
                        { href: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
                        { href: "/parties", label: "Parties", icon: FaUserFriends },
                        { href: "/products", label: "Product Manager", icon: FaBox },
                        { href: "/sales", label: "Sales", icon: FaShoppingCart },
                        { href: "/purchases", label: "Purchases", icon: FaCreditCard },
                        { href: "/pos", label: "POS", icon: FaCashRegister },
                        { href: "/reports", label: "Reports", icon: FaChartLine },
                        { href: "/settings", label: "Settings", icon: FaCog },
                    ].map((item) => (
                        <Link href={item.href} key={item.label} onClick={closeSidebar}>
                            <div className="flex text-gray-300 items-center py-3 px-4 rounded-lg hover:bg-gray-700 hover:text-white transition duration-300">
                                <item.icon className="mr-3" />
                                <span>{item.label}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Overlay untuk mobile */}
            {isOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
