"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FaTachometerAlt,
    FaBox,
    FaCashRegister,
    FaShoppingCart,
    FaChartLine,
    FaCreditCard,
    FaUserFriends,
    FaCog,
} from "react-icons/fa";

const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { href: "/parties", label: "Parties", icon: FaUserFriends },
    { href: "/products", label: "Product Manager", icon: FaBox },
    { href: "/sales", label: "Sales", icon: FaShoppingCart },
    { href: "/purchases", label: "Purchases", icon: FaCreditCard },
    { href: "/pos", label: "POS", icon: FaCashRegister },
    { href: "/reports", label: "Reports", icon: FaChartLine },
    { href: "/settings", label: "Settings", icon: FaCog },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 z-20 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:block`}
        >
            <div className="flex items-center justify-center h-16 border-b border-gray-700 px-4">
                <Image
                    src="/logo-pplg.png"
                    alt="POS Logo"
                    width={40}
                    height={40}
                    className=""
                />
                <h2 className="ml-3 text-xl font-semibold">POS System</h2>
            </div>

            <nav className="mt-6 space-y-4 px-4">
                {menuItems.map(({ href, label, icon: Icon }) => (
                    <Link href={href} key={label} onClick={closeSidebar}>
                        <div className="flex items-center py-3 px-4 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition duration-300">
                            <Icon className="mr-3 text-lg" />
                            <span className="text-sm md:text-base">{label}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
