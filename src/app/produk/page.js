
"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import LoadingSpin from "@/components/LoadingSpin";
import EditProductModal from "@/components/EditProductModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddProductModal from "@/components/AddProductModal";
import { useTheme } from "@/app/context/theme-context";
import { FaSearch } from "react-icons/fa";

export default function ProductPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [darkMode] = useTheme();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/produk");
            if (!response.ok) throw new Error("Gagal mengambil data produk");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Terjadi kesalahan saat mengambil data produk:", error);
            toast.error("Gagal mengambil data produk");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredProducts = products.filter(
        (product) =>
            product.name && product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleAddProduct = async (newProduct, callback) => {
        const isDuplicate = products.some(
            (p) => p.name.toLowerCase() === newProduct.name.toLowerCase()
        );
        if (isDuplicate) {
            callback && callback("Produk dengan nama ini sudah ada!");
            return;
        }

        try {
            const response = await fetch("/api/produk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (!response.ok) {
                const err = await response.text();
                callback && callback(`Gagal menambah produk: ${err}`);
                return;
            }

            const addedProduct = await response.json();
            setProducts((prev) => [...prev, addedProduct]);
            toast.success("Produk berhasil ditambahkan");
            callback && callback(null);
        } catch (error) {
            callback && callback("Terjadi kesalahan saat menambah produk.");
        }
    };

    const handleEditProduct = (id) => {
        const productToEdit = products.find((product) => product.id === id);
        setSelectedProduct(productToEdit);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleUpdateProduct = () => {
        fetchData();
    };

    const handleDeleteProduct = async (id) => {
        const isConfirmed = window.confirm("Apakah Anda yakin ingin menghapus produk ini?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`/api/produk/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Produk berhasil dihapus");
                fetchData();
            } else {
                const errorMessage = await response.text();
                toast.error(`Gagal menghapus produk: ${errorMessage}`);
            }
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus produk. Silakan coba lagi");
        }
    };

    return (
        <div className={`${darkMode ? "dark" : ""}`}>
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} darkMode={darkMode} />

                <div className="flex flex-col flex-1 mt-16">
                    <Navbar toggleSidebar={toggleSidebar} darkMode={darkMode} />

                    <main className="p-4 sm:px-6 flex flex-col flex-1">
                        <div
                            className={`flex flex-col sm:flex-row justify-between items-center mb-6 px-4 py-3 rounded-lg shadow-md
                            ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
                        >
                            <h1 className="text-2xl font-bold w-full sm:w-auto text-center sm:text-left">
                                Manajemen Produk
                            </h1>

                            <div className="flex flex-col sm:flex-row items-center w-full sm:w-auto space-y-4 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        className="w-full p-3 pl-10 pr-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                                        placeholder="Cari Produk..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900">
                                        <FaSearch />
                                    </span>
                                </div>

                                <button
                                    className={`px-4 py-2 rounded-lg font-semibold transition
                                        ${darkMode ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
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

                        {isLoading ? (
                            <div className="flex justify-center items-center flex-grow">
                                <LoadingSpin />
                            </div>
                        ) : (
                            <ProductTable
                                products={filteredProducts}
                                onEdit={handleEditProduct}
                                onDelete={handleDeleteProduct}
                                search={search}
                                darkMode={darkMode}
                            />
                        )}
                    </main>
                </div>

                {isModalOpen && selectedProduct && (
                    <EditProductModal
                        product={selectedProduct}
                        onClose={handleCloseModal}
                        onUpdate={handleUpdateProduct}
                        darkMode={darkMode}
                    />
                )}

                {isSidebarOpen && (
                    <div
                        onClick={closeSidebar}
                        className="fixed inset-0 bg-black bg-opacity-50 z-10"
                    ></div>
                )}
            </div>
        </div>
    );
}
