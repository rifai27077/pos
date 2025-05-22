"use client"

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import DashboardCards from "@/components/DashboardCards";
import StockAlerts from "@/components/StockAlerts";
import SalesChart from "@/components/SalesChart";
import TransactionTable from "@/components/TransactionTable";
import { useTheme } from "@/app/context/theme-context"

export default function Home() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode] = useTheme()

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            
            <div className="flex flex-col flex-1 mt-16">
                <Navbar toggleSidebar={toggleSidebar} />

                <main className={`p-4 sm:px-6 min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                    <div className="p-6 space-y-6">
                        <h1 className="text-2xl font-extrabold text-gray-800 dark:text-white text-left">Dashboard</h1>
                        <DashboardCards />
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <StockAlerts />
                            <SalesChart />
                        </div>
                        <TransactionTable />
                    </div>
                </main>
            </div>

            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                ></div>
            )}
        </div>
    );
}
