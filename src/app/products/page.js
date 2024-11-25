"use client"

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import Header from "@/components/Header";
import LoadingSpin from "@/components/LoadingSpin";
import EditProductModal from "@/components/EditProductModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductsPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name && product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditProduct = (id) => {
        const productToEdit = products.find((product) => product.id === id);
        setSelectedProduct(productToEdit);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    // Fungsi untuk menghapus produk
    const handleDeleteProduct = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this product?");
    
        if (!isConfirmed) {
            return;
        }
    
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                toast.success('Product deleted successfully');
                fetchData();
            } else {
                const errorMessage = await response.text();
                toast.error(`Failed to delete product: ${errorMessage}`);
            }
        } catch (error) {
            toast.error('An error occurred while deleting the product. Please try again.');
        }
    };    

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex flex-col flex-1 md:ml-64 mt-16">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="p-4 sm:px-6 min-h-screen">
                    <Header
                        search={search}
                        setSearch={setSearch}
                    />
                    {isLoading && (
                        <div className="flex justify-center items-center h-full min-h-[calc(100vh-500px)]">
                            <LoadingSpin />
                        </div>
                    )}
                    {!isLoading && (
                        <ProductTable
                            products={filteredProducts}
                            onEdit={handleEditProduct}
                            onDelete={handleDeleteProduct}
                            search={search}
                        />
                    )}
                </main>
            </div>

            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                ></div>
            )}

            {isModalOpen && selectedProduct && (
                <EditProductModal
                    product={selectedProduct}
                    onClose={handleCloseModal}
                    onUpdate={fetchData}
                />
            )}
        </div>
    );
}
