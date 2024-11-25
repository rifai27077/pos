import React, { useState } from "react";
import AddProductModal from "@/components/AddProductModal";

const Header = ({ search, setSearch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // Fungsi untuk menambahkan produk
    const handleAddProduct = (newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-md space-y-4 lg:space-x-6 lg:space-y-0">
            <h1 className="text-2xl font-bold text-center lg:text-left w-full lg:w-auto">
                Manajemen Produk
            </h1>

            <div className="flex flex-col items-center w-full sm:w-auto space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
                <input
                    type="text"
                    placeholder="Cari produk..."
                    className="px-4 py-2 w-full sm:w-64 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="px-4 py-2 bg-white text-gray-800 font-semibold rounded-lg hover:bg-blue-100 transition duration-300 w-full sm:w-auto sm:min-w-[150px]"
                    onClick={openModal}
                >
                    Tambah Produk
                </button>
            </div>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddProduct={handleAddProduct}
            />
        </div>
    );
};

export default Header;
