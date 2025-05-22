"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import Header from "@/components/Header";
import LoadingSpin from "@/components/LoadingSpin";
import EditProductModal from "@/components/EditProductModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "@/components/SearchBar";
import AddProductModal from "@/components/AddProductModal";
import { useTheme } from "@/app/context/theme-context";

export default function ProductPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false)
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [darkMode] = useTheme()

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/product");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Failed to fetch products");
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

    // Fungsi untuk handle tambah produk
    const handleAddProduct = async (newProduct, callback) => {
        const isDuplicate = products.some(
            (p) => p.name.toLowerCase() === newProduct.name.toLowerCase()
        );
        if (isDuplicate) {
            callback && callback("Produk dengan nama ini sudah ada!");
            return;
        }

        try {
            // Asumsikan ada endpoint POST untuk tambah produk
            const response = await fetch("/api/product", {
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
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
        if (!isConfirmed) return;

        try {
            const response = await fetch(`/api/product/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                toast.success("Product deleted successfully");
                fetchData();
            } else {
                const errorMessage = await response.text();
                toast.error(`Failed to delete product: ${errorMessage}`);
            }
        } catch (error) {
            toast.error("An error occurred while deleting the product. Please try again.");
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
                                <SearchBar search={search} setSearch={setSearch} />
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
