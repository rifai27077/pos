"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import SearchBar from "@/components/SearchBar";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import Payment from "@/components/Payment";
import { toast } from 'react-toastify';

export default function PointOfSale() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch("/api/products");
            const data = await response.json();
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const addToCart = (product) => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        setCart(cart.map((item) =>
            item.id === productId ? { ...item, quantity } : item
        ));
    };

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const openPaymentModal = () => {
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
                className="lg:w-64 sm:w-full"
            />

            <div className="flex flex-col flex-1 mt-16 lg:mr-64">
                {/* Navbar */}
                <Navbar toggleSidebar={toggleSidebar} />

                <main className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Product List Section */}
                        <div className="flex-1 lg:w-2/3 lg:mr-36">
                            <div className="mb-6">
                                <SearchBar search={search} setSearch={setSearch} />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
                            <ProductList
                                products={products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))}
                                addToCart={addToCart}
                            />
                        </div>

                        {/* Cart Section */}
                        <div className="lg:w-1/4 w-full fixed top-16 right-0 bg-white p-4 rounded-lg shadow-md overflow-y-auto z-10 h-[calc(100vh-80px)]">
                            <h2 className="text-2xl font-bold mb-4">Keranjang</h2>
                            <div className="flex-1 max-h-[calc(100vh-80px)] overflow-y-auto mb-4">
                                <Cart
                                    cart={cart}
                                    removeFromCart={removeFromCart}
                                    updateQuantity={updateQuantity}
                                />
                            </div>
                            <Checkout
                                subtotal={subtotal}
                                openPaymentModal={openPaymentModal}
                                
                            />
                        </div>
                    </div>
                </main>
            </div>

            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    className="fixed inset-0 bg-black bg-opacity-50 z-10"
                ></div>
            )}

            {isPaymentModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <Payment closePaymentModal={closePaymentModal} />
                    </div>
                </div>
            )}
        </div>
    );
}
