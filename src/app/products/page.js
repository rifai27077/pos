"use client"

import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ProductTable from "@/components/ProductTable";
import Header from "@/components/Header";

export default function ProductsPage() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);  // Tambahkan state isLoading
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            console.log('Fetched products:', data); // Log untuk debugging
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setIsLoading(false);
        }
    };    

    useEffect(() => {
        fetchData(); // Ambil data produk saat halaman dimuat
    }, []);

    const filteredProducts = products.filter((product) =>
        product.name && product.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEditProduct = (id) => {
        window.location.href = `/products/edit/${id}`;
    };

    // Fungsi untuk menghapus produk
    const handleDeleteProduct = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");
        if (confirmed) {
            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: "DELETE",
                });
    
                const responseJson = await response.json();
    
                if (response.ok) {
                    alert("Product deleted successfully");
                    fetchData(); // Reload data after deletion
                } else {
                    alert(`Failed to delete product: ${responseJson?.message || responseText}`);
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                alert("An error occurred while deleting the product");
            }
        }
    };
    

    return (
        <div className="flex flex-col flex-1 md:ml-64">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex flex-col flex-1">
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="p-4 sm:px-6 bg-gray-100 min-h-screen">
                    <Header
                        search={search}  // Kirimkan search
                        setSearch={setSearch}  // Kirimkan setSearch
                    />
                    {isLoading && (
                        <div className="flex justify-center items-center">
                            <div className="spinner-border animate-spin h-8 w-8 border-t-4 border-blue-600 rounded-full"></div>
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
        </div>
    );
}
