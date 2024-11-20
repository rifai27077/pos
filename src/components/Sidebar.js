"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaTachometerAlt,
    FaBox,
    FaCashRegister,
    FaShoppingCart,
    FaChartLine,
    FaCreditCard,
    FaUserFriends,
    FaCog,
    FaBell,
    FaTimes,
} from "react-icons/fa";

const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: FaTachometerAlt },
    { href: "/customers", label: "Customers & Suppliers", icon: FaUserFriends },
    { href: "/products", label: "Products", icon: FaBox },
    { href: "/sales", label: "Sales", icon: FaShoppingCart },
    { href: "/purchases", label: "Purchases", icon: FaCreditCard },
    { href: "/pos", label: "Point of Sale", icon: FaCashRegister },
    { href: "/reports", label: "Reports", icon: FaChartLine },
    { href: "/notifications", label: "Notifications", icon: FaBell },
    { href: "/settings", label: "Settings", icon: FaCog },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
    const pathname = usePathname();

    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 z-20 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:block`}
        >
            <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
                <h2 className="text-xl font-semibold">POS System</h2>
                <button
                    onClick={closeSidebar}
                    className="text-white md:hidden hover:text-gray-300 transition duration-300"
                >
                    <FaTimes className="text-xl" />
                </button>
            </div>

            <nav className="mt-6 space-y-4 px-4">
                {menuItems.map(({ href, label, icon: Icon }) => (
                    <Link href={href} key={label} onClick={closeSidebar}>
                        <div
                            className={`flex items-center py-3 px-4 rounded-lg transition duration-300 ${
                                pathname === href
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }`}
                        >
                            <div className="group relative">
                                <Icon className="text-lg md:text-xl" />
                                <span className="absolute left-12 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-xs px-2 py-1 rounded hidden md:group-hover:block">
                                    {label}
                                </span>
                            </div>
                            <span className="ml-3 text-sm md:text-base">{label}</span>
                        </div>
                    </Link>
                ))}
            </nav>

        </aside>
    );
};

export default Sidebar;
