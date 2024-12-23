"use client"

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import DashboardCards from "@/components/DashboardCards";
import StockAlerts from "@/components/StockAlerts";
import SalesChart from "@/components/SalesChart";
import TransactionTable from "@/components/TransactionTable";

export default function Home() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex flex-col flex-1 md:ml-64 mt-16"> {/* Tambahkan mt-16 untuk memberi ruang untuk navbar fixed */}
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="p-4">
                    <div className="p-6 space-y-6">
                        <h1 className="text-2xl font-bold text-gray-800 text-center">Dashboard</h1>
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
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                ></div>
            )}
        </div>
    );
}
