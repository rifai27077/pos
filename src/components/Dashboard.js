
"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale, // for category axis
    LinearScale,   // for linear axis (e.g., Y-axis for bar/line charts)
    BarElement,    // for bar chart
    Title,         // for chart title
    Tooltip,       // for tooltips
    Legend         // for legend
);

const Dashboard = () => {
    const stats = [
        { title: "Total Sales", value: "Rp 25.000.000", color: "bg-green-500" },
        { title: "Transactions", value: "150", color: "bg-blue-500" },
        { title: "Low Stock Items", value: "8", color: "bg-red-500" },
    ];

    const chartData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                label: "Sales (in Rp)",
                data: [5000000, 7000000, 8000000, 6000000, 9000000],
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className={`p-4 rounded-lg text-white ${stat.color}`}
                    >
                        <h3 className="text-lg font-medium">{stat.title}</h3>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Chart Section */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <h2 className="text-xl font-medium mb-4">Sales Overview</h2>
                <Bar data={chartData} />
            </div>
        </div>
    );
};

export default Dashboard;
