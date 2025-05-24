"use client";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import ProductList from "@/components/ProductList";
import { FaSearch } from "react-icons/fa";
import Cart from "@/components/Cart";
import Checkout from "@/components/Checkout";
import Payment from "@/components/Payment";
import { toast } from 'react-toastify';
import { useTheme } from "../context/theme-context";

export default function PointOfSale() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [darkMode] = useTheme()
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const response = await fetch("../../pages/api/produk");
            const data = await response.json();
            setProducts(data);
            setLoading(false);
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

    useEffect(() => {
        if (isPaymentModalOpen) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [isPaymentModalOpen]);

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
        if (cart.length === 0) {
            toast.error("Keranjang kosong. Tambahkan produk terlebih dahulu.");
            return;
        }   
        setPaymentModalOpen(true);
    };


    const closePaymentModal = () => {
        setPaymentModalOpen(false);
    };

    return (
        <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            <Sidebar
                isOpen={isSidebarOpen}
                closeSidebar={closeSidebar}
                className="lg:w-64 sm:w-full"
            />

            <div className="flex flex-col flex-1 mt-16 lg:mr-64">
                <Navbar toggleSidebar={toggleSidebar} setSearch={setSearch} search={search} />

                <main className="flex-1 p-6 lg:p-8">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex-1 lg:w-2/3 lg:mr-36">
                            <h2 className="text-2xl font-bold mb-4">Daftar Produk</h2>
                            {loading ? <p>Loading product</p> : (
                                <ProductList
                                    products={products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()))}
                                    addToCart={addToCart}
                                />
                            )}
                        </div>

                        <div className={`lg:w-1/4 w-full p-4 rounded-lg shadow-md overflow-y-auto z-10 h-auto lg:fixed lg:top-16 lg:right-0 lg:h-[calc(100vh-80px)] mt-4 lg:mt-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                            <h2 className="text-2xl font-bold mb-4">Keranjang</h2>
                            <div className="flex-1 max-h-[calc(100vh-80px)] overflow-y-auto mb-4">
                                <Cart
                                    cart={cart}
                                    removeFromCart={removeFromCart}
                                    updateQuantity={updateQuantity}
                                />
                            </div>
                            <div className={`lg:static fixed bottom-0 left-0 right-0 p-4 shadow-md z-20 lg:z-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                                <span>{totalItems} item</span>
                                <Checkout
                                    subtotal={subtotal}
                                    openPaymentModal={openPaymentModal}
                                />
                            </div>
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
                    <div className={`p-6 rounded-lg shadow-lg w-96 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        <Payment closePaymentModal={closePaymentModal} />
                    </div>
                </div>
            )}
        </div>
    );
}
