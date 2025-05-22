import React from "react";
import { FaDollarSign, FaBox, FaShoppingCart } from "react-icons/fa";
import { useTheme } from "@/app/context/theme-context";

const DashboardCards = () => {
    const [darkMode] = useTheme();

    const stats = [
        { icon: FaDollarSign, label: "Total Pendapatan", value: "Rp 25,000,000", color: "bg-blue-500" },
        { icon: FaBox, label: "Produk Terjual", value: "1,250", color: "bg-green-500" },
        { icon: FaShoppingCart, label: "Total Transaksi", value: "420", color: "bg-yellow-500" },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map(({ icon: Icon, label, value, color }) => (
                <div
                    key={label}
                    className={`shadow-md p-4 rounded-lg flex items-center space-x-4 transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}
                >
                    <div className={`p-3 rounded-full ${color}`}>
                        <Icon className="text-2xl text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardCards;
