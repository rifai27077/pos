import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaTachometerAlt,
    FaBox,
    FaCashRegister,
    FaChartLine,
    FaUser,
    FaCog,
    FaTimes,
} from "react-icons/fa";
import { useTheme } from "@/app/context/theme-context"; // import useTheme

const menuItems = [
    { href: "/", label: "Dashboard", icon: FaTachometerAlt },
    { href: "/product", label: "Product", icon: FaBox },
    { href: "/user", label: "Data User", icon: FaUser },
    { href: "/pos", label: "Point of Sale", icon: FaCashRegister },
    { href: "/reports", label: "Reports", icon: FaChartLine },
    { href: "/settings", label: "Settings", icon: FaCog },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
    const pathname = usePathname();
    const [darkMode] = useTheme(); // ambil darkMode dari context

    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 transition-transform duration-300 z-50 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            } ${
                darkMode
                    ? "bg-gray-800 text-gray-200 border-r border-gray-700"
                    : "bg-gray-100 text-gray-900 border-r border-gray-300"
            }`}
        >
            <div className={`flex items-center justify-between h-16 border-b px-4 ${
                darkMode ? "border-gray-700" : "border-gray-300"
            }`}>
                <h2 className="text-xl font-semibold">POS System</h2>
                <button
                    onClick={closeSidebar}
                    className={`hover:text-gray-500 transition duration-300 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                >
                    <FaTimes className="text-xl" />
                </button>
            </div>

            <nav className="mt-6 space-y-4 px-4">
                {menuItems.map(({ href, label, icon: Icon }) => (
                    <Link href={href} key={label} onClick={closeSidebar}>
                        <div
                            className={`flex items-center my-2 py-3 px-4 rounded-lg transition duration-300 cursor-pointer ${
                                pathname === href
                                    ? darkMode
                                        ? "bg-gray-700 text-white"
                                        : "bg-gray-300 text-gray-900"
                                    : darkMode
                                    ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                                    : "text-gray-700 hover:bg-gray-300 hover:text-gray-900"
                            }`}
                        >
                            <Icon className="text-lg" />
                            <span className="ml-3 text-sm">{label}</span>
                        </div>
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
