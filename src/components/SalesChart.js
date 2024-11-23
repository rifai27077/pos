import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const SalesChart = () => {
    // State untuk filter waktu dan produk
    const [timeRange, setTimeRange] = useState("monthly"); // Default ke bulanan
    const [selectedProduct, setSelectedProduct] = useState("Produk A");

    // Fungsi untuk mengubah filter waktu
    const handleTimeRangeChange = (e) => setTimeRange(e.target.value);

    // Fungsi untuk mengubah filter produk
    const handleProductChange = (e) => setSelectedProduct(e.target.value);

    // Data grafik berdasarkan waktu yang dipilih
    const data = {
        labels: timeRange === "monthly" ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] : timeRange === "weekly" ? ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"] : ["2024-11-01", "2024-11-02", "2024-11-03", "2024-11-04", "2024-11-05", "2024-11-06"],
        datasets: [
        {
            label: selectedProduct, // Label produk yang dipilih
            data:
            selectedProduct === "Produk A"
                ? timeRange === "monthly"
                ? [1000000, 1200000, 1300000, 1500000, 1600000, 1400000]
                : timeRange === "weekly"
                ? [120, 150, 300, 200, 250, 400]
                : [50, 70, 90, 110, 130, 160]
                : selectedProduct === "Produk B"
                ? timeRange === "monthly"
                ? [900000, 1100000, 1200000, 1400000, 1500000, 1300000]
                : timeRange === "weekly"
                ? [100, 120, 250, 180, 220, 380]
                : [60, 80, 100, 120, 140, 170]
                : timeRange === "monthly"
                ? [800000, 950000, 1100000, 1300000, 1400000, 1200000]
                : timeRange === "weekly"
                ? [110, 130, 280, 210, 230, 400]
                : [55, 75, 95, 115, 135, 160],
            borderColor: "rgb(59, 130, 246)", // Warna hijau lembut
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Warna latar belakang grafik
            tension: 0.3,
            pointRadius: 5, // Ukuran titik pada grafik
            pointBackgroundColor: "rgba(59, 130, 246, 0.2)", // Warna titik
            fll: true,
        },
        ],
    };

    return (
        
        <div className="bg-gray-800 shadow-lg p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-5">Grafik Penjualan</h2>

            {/* Dropdown untuk filter waktu */}
            <select
                onChange={handleTimeRangeChange}
                value={timeRange}
                className="bg-gray-700 mb-4 p-3 mx-2 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[rgba(59, 130, 246, 0.2)]"
            >
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
            </select>

            {/* Dropdown untuk filter produk */}
            <select
                onChange={handleProductChange}
                value={selectedProduct}
                className="bg-gray-700 mb-4 p-3 mx-2 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[rgba(59, 130, 246, 0.2)]"
            >
                <option value="Produk A">Produk A</option>
                <option value="Produk B">Produk B</option>
                <option value="Produk C">Produk C</option>
            </select>

            {/* Grafik */}
            <Line data={data} />
        </div>
    );
};

export default SalesChart;
