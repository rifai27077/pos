import React from "react";
import { FaDollarSign, FaBox, FaShoppingCart } from "react-icons/fa";

const DashboardCards = () => {
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
            className="bg-gray-800 text-white shadow-md p-4 rounded-lg flex items-center space-x-4"
            >
            <div className={`p-3 rounded-full ${color}`}>
                <Icon className="text-2xl text-white" />
            </div>
            <div>
                <p className="text-gray-400 text-sm">{label}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
            </div>
        ))}
        </div>
    );
};

export default DashboardCards;
