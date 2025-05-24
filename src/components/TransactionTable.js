"use client";

import React, { useState, useEffect } from "react";
import Select from "react-select";
import Pagination from "./Pagination";
import { useTheme } from "@/app/context/theme-context";
import { formatToRupiah } from "@/utils/format"; // jika ada util format rupiah, kalau tidak bisa hapus

const TransactionTable = ({ search }) => {
    const [darkMode] = useTheme();
    const [sortColumn, setSortColumn] = useState("time");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const transactions = [
        { id: "TRX001", time: "2024-11-23 10:00", total: 500000 },
        { id: "TRX002", time: "2024-11-23 11:15", total: 750000 },
        { id: "TRX003", time: "2024-11-23 12:30", total: 1200000 },
        { id: "TRX004", time: "2024-11-24 09:10", total: 430000 },
        { id: "TRX005", time: "2024-11-24 13:20", total: 680000 },
        { id: "TRX006", time: "2024-11-25 08:30", total: 920000 },
        { id: "TRX007", time: "2024-11-25 10:45", total: 1110000 },
        { id: "TRX008", time: "2024-11-26 14:10", total: 770000 },
    ];

    const handleSort = (selectedOption) => {
        const [column, order] = selectedOption.value.split("-");
        setSortColumn(column);
        setSortOrder(order);
    };

    const filteredTransactions = transactions.filter((trx) => {
        const searchQuery = search ? search.toLowerCase() : "";
        return trx.id.toLowerCase().includes(searchQuery);
    });

    const sortedTransactions = filteredTransactions.sort((a, b) => {
        if (sortColumn === "total") {
        return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
        }
        if (sortColumn === "time") {
        return sortOrder === "asc"
            ? new Date(a.time) - new Date(b.time)
            : new Date(b.time) - new Date(a.time);
        }
        // default sort by id string
        return sortOrder === "asc"
        ? a.id.localeCompare(b.id)
        : b.id.localeCompare(a.id);
    });

    const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
    const paginatedTransactions = sortedTransactions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page === "...") return;
        setCurrentPage(page);
    };

    const sortOptions = [
        { value: "id-asc", label: "ID (A-Z)" },
        { value: "id-desc", label: "ID (Z-A)" },
        { value: "time-asc", label: "Waktu (Terlama)" },
        { value: "time-desc", label: "Waktu (Terbaru)" },
        { value: "total-asc", label: "Total (Rendah ke Tinggi)" },
        { value: "total-desc", label: "Total (Tinggi ke Rendah)" },
    ];

    const customStyles = {
        control: (base) => ({
        ...base,
        backgroundColor: darkMode ? "#1A202C" : "#FFFFFF",
        borderColor: darkMode ? "#4A5568" : "#E2E8F0",
        borderRadius: "8px",
        padding: ".2rem",
        boxShadow: "none",
        color: darkMode ? "#E2E8F0" : "#2D3748",
        }),
        menu: (base) => ({
        ...base,
        backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
        borderColor: darkMode ? "#4A5568" : "#E2E8F0",
        borderRadius: "8px",
        color: darkMode ? "#E2E8F0" : "#2D3748",
        }),
        option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected
            ? darkMode
            ? "#4A5568"
            : "#2D3748"
            : state.isFocused
            ? darkMode
            ? "#2A4365"
            : "#EDF2F7"
            : darkMode
            ? "#1A202C"
            : "white",
        color: state.isSelected ? "white" : darkMode ? "#E2E8F0" : "#2D3748",
        padding: "10px",
        cursor: "pointer",
        }),
        singleValue: (provided) => ({
        ...provided,
        color: darkMode ? "#E2E8F0" : "#2D3748",
        }),
    };

    return (
        <div
            className={`bg-white dark:bg-gray-800 shadow-lg p-6 rounded-xl transition-colors duration-300`}
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Tabel Transaksi
            </h2>
            <div className="flex justify-end mb-4">
                <Select
                options={sortOptions}
                onChange={handleSort}
                styles={customStyles}
                className="w-56 sm:w-72"
                classNamePrefix="custom-select"
                placeholder="Urutkan berdasarkan..."
                theme={(theme) => ({
                    ...theme,
                    colors: {
                    ...theme.colors,
                    primary25: darkMode ? "#2A4365" : "#EDF2F7",
                    primary: darkMode ? "#4A5568" : "#2D3748",
                    neutral0: darkMode ? "#1A202C" : "#fff",
                    neutral80: darkMode ? "#E2E8F0" : "#2D3748",
                    },
                })}
                />
            </div>
            <div
                className={`overflow-x-auto shadow-lg rounded-lg
                    ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"}
                `}
            >
                <table
                    className={`min-w-full rounded-lg transition-colors duration-300 ${
                    darkMode ? "text-gray-200" : "text-gray-900"
                    }`}
                >
                    <thead
                    className={`${
                        darkMode ? "bg-gray-900 text-gray-100" : "bg-blue-600 text-white"
                    }`}
                    >
                    <tr>
                        <th className="px-4 py-3 border-b text-left font-semibold text-sm sm:text-base">
                        ID Transaksi
                        </th>
                        <th className="px-4 py-3 border-b text-left font-semibold text-sm sm:text-base">
                        Waktu
                        </th>
                        <th className="px-4 py-3 border-b text-left font-semibold text-sm sm:text-base">
                        Total Harga
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedTransactions.map((trx) => (
                        <tr
                        key={trx.id}
                        className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600 transition duration-200"
                        >
                            <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white">
                                {trx.id}
                            </td>
                            <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white">
                                {trx.time}
                            </td>
                            <td className="pl-4 py-3 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white">
                                {formatToRupiah ? formatToRupiah(trx.total) : `Rp ${trx.total.toLocaleString("id-ID")}`}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot
                    className={darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}
                    >
                    <tr>
                        <td colSpan="3" className="px-4 py-3 text-right">
                        <Pagination
                            totalPages={totalPages}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                            darkMode={darkMode}
                        />
                        </td>
                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default TransactionTable;
