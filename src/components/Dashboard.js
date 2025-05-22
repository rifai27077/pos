"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useTheme } from "@/app/context/theme-context";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [darkMode] = useTheme();

    const stats = [
        { title: "Total Sales", value: "Rp 25.000.000", colorLight: "bg-green-500", colorDark: "bg-green-600" },
        { title: "Transactions", value: "150", colorLight: "bg-blue-500", colorDark: "bg-blue-600" },
        { title: "Low Stock Items", value: "8", colorLight: "bg-red-500", colorDark: "bg-red-600" },
    ];

    const chartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                label: "Sales (in Rp)",
                data: [5000000, 7000000, 8000000, 6000000, 9000000],
                backgroundColor: darkMode
                    ? "rgba(59, 130, 246, 0.7)" // biru terang untuk dark mode
                    : "rgba(75, 192, 192, 0.6)", // hijau muda untuk light mode
                borderColor: darkMode
                    ? "rgba(59, 130, 246, 1)"
                    : "rgba(75, 192, 192, 1)",
                borderWidth: 2,
                borderRadius: 5,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: darkMode ? '#fff' : '#000'
                }
            },
            title: {
                display: true,
                text: 'Weekly Sales',
                color: darkMode ? '#fff' : '#000'
            }
        },
        scales: {
            x: {
                ticks: {
                    color: darkMode ? '#fff' : '#000'
                },
                grid: {
                    color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }
            },
            y: {
                ticks: {
                    color: darkMode ? '#fff' : '#000'
                },
                grid: {
                    color: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
                }
            }
        }
    };


    return (
        <div className="p-6 min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold mb-8 text-left text-gray-800 dark:text-white">Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className={`p-6 rounded-2xl shadow-md text-white ${
                            darkMode ? stat.colorDark : stat.colorLight
                        }`}
                    >
                        <h3 className="text-lg font-semibold">{stat.title}</h3>
                        <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 transition-colors duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-white">Sales Overview</h2>
                <Bar data={chartData} options={chartOptions}/>
            </div>
        </div>
    );
};

export default Dashboard;
