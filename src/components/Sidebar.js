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

const menuItems = [
    { href: "/", label: "Dashboard", icon: FaTachometerAlt },
    { href: "/products", label: "Products", icon: FaBox },
    { href: "/user", label: "Data User", icon: FaUser },
    { href: "/pos", label: "Point of Sale", icon: FaCashRegister },
    { href: "/reports", label: "Reports", icon: FaChartLine },
    { href: "/settings", label: "Settings", icon: FaCog },
];

const Sidebar = ({ isOpen, closeSidebar }) => {
    const pathname = usePathname();

    return (
        <aside
            className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 z-50 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* Header Sidebar */}
            <div className="flex items-center justify-between h-16 border-b border-gray-700 px-4">
                <h2 className="text-xl font-semibold">POS System</h2>
                <button
                    onClick={closeSidebar}
                    className="text-white hover:text-gray-300 transition duration-300"
                >
                    <FaTimes className="text-xl" />
                </button>
            </div>

            {/* Menu Sidebar */}
            <nav className="mt-6 space-y-4 px-4">
                {menuItems.map(({ href, label, icon: Icon }) => (
                    <Link href={href} key={label} onClick={closeSidebar}>
                        <div
                            className={`flex items-center my-2 py-3 px-4 rounded-lg transition duration-300 ${
                                pathname === href
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
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
