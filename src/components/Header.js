// src/components/Header.js
"use client";

import React, { useState } from "react";
import AddProductModal from "@/components/AddProductModal";
import SearchBar from "@/components/SearchBar";
import { toast } from "react-toastify";

const Header = ({ search, setSearch, onAddProduct, darkMode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddProduct = (newProduct) => {
        // Pastikan parent yang pegang data, jadi validasi duplikat juga di parent
        if (onAddProduct) {
            onAddProduct(newProduct, (error) => {
                if (error) {
                    toast.error(error);
                } else {
                    closeModal();
                }
            });
        }
    };

    return (
        <div
            className={`flex flex-col sm:flex-row justify-between items-center mb-6 px-4 py-3 rounded-lg shadow-md
            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
        >
            <h1 className="text-2xl font-bold w-full sm:w-auto text-center sm:text-left">
                Manajemen Produk
            </h1>

            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
                <SearchBar search={search} setSearch={setSearch} />
                <button
                    className={`px-4 py-2 rounded-lg font-semibold transition
                        ${darkMode ? "bg-blue-100 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                    onClick={openModal}
                >
                    Tambah Produk
                </button>
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddProduct={handleAddProduct}
                darkMode={darkMode}
            />
        </div>
    );
};

export default Header;
