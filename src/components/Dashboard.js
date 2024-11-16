"use client"
import React from 'react';

const Dashboard = () => {
  // Dummy data for demonstration
    const stats = {
        totalProducts: 50,
        totalSales: 1200,
        totalTransactions: 35,
        totalCustomers: 100,
    };

    return (
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-8">POS Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Total Products */}
            <div className="border p-6 rounded-lg shadow-lg bg-blue-100">
            <h3 className="text-xl font-semibold text-blue-600">Total Products</h3>
            <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>

            {/* Total Sales */}
            <div className="border p-6 rounded-lg shadow-lg bg-green-100">
            <h3 className="text-xl font-semibold text-green-600">Total Sales ($)</h3>
            <p className="text-3xl font-bold">${stats.totalSales}</p>
            </div>

            {/* Total Transactions */}
            <div className="border p-6 rounded-lg shadow-lg bg-yellow-100">
            <h3 className="text-xl font-semibold text-yellow-600">Total Transactions</h3>
            <p className="text-3xl font-bold">{stats.totalTransactions}</p>
            </div>

            {/* Total Customers */}
            <div className="border p-6 rounded-lg shadow-lg bg-purple-100">
            <h3 className="text-xl font-semibold text-purple-600">Total Customers</h3>
            <p className="text-3xl font-bold">{stats.totalCustomers}</p>
            </div>
        </div>

        {/* Additional Chart/Graphs can be added here in the future */}
        </div>
    );
};

export default Dashboard;
