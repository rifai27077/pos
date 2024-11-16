"use client"

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1">
        <Navbar />
      </div>
    </div>
    <p className="text-primary"></p>
    </>
  );
}
