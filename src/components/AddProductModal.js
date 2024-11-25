"use client"

import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast untuk notifikasi
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk Toastify

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    // Fungsi untuk mengirim produk baru dan menutup modal
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newProduct = {
            name,
            price: parseInt(price),
            stock: parseInt(stock),
        };

        try {
            const response = await fetch("/api/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                onAddProduct(newProduct);
                toast.success("Product added successfully!"); // Menampilkan notifikasi success
                onClose();
            } else {
                toast.error("Failed to add product"); // Menampilkan notifikasi error
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("An error occurred while adding the product"); // Menampilkan notifikasi error
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tambahkan Produk Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Nama Produk</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Harga</label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-semibold text-gray-700">Stok</label>
                        <input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Tambah Produk
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default AddProductModal;
