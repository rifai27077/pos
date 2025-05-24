"use client";

import React, { useState } from "react";
import Dashboard from "@/components/Dashboard";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { useTheme } from "@/app/context/theme-context"; // ⬅️ import theme context

const DashboardPage = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode] = useTheme(); // ⬅️ gunakan darkMode dari context

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} darkMode={darkMode} />

                <div className="flex flex-col flex-1 md:ml-64 mt-16">
                    <Navbar toggleSidebar={toggleSidebar} darkMode={darkMode} />

                    <main className="p-4">
                        <Dashboard darkMode={darkMode} />
                    </main>
                </div>

                {isSidebarOpen && (
                    <div
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                    ></div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
