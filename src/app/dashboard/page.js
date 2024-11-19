"use client"

import React, { useState } from 'react';
import Dashboard from '@/components/Dashboard';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const DashboardPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);
    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex flex-col flex-1 md:ml-64">
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="p-4">
                    <Dashboard />
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
};

export default DashboardPage;
