"use client"

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";

export default function Home() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

            {/* Main Content */}
            <div className="flex flex-col flex-1 md:ml-64">
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                {/* Content */}
                <main className="p-4">
                    <h1 className="text-2xl font-bold">Welcome to POS System</h1>
                    <p className="mt-4 text-gray-600">
                        This is the main content area. You can add more content here.
                    </p>
                </main>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                ></div>
            )}
        </div>
    );
}
