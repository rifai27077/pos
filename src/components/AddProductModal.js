"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "@/app/context/theme-context";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [img, setImg] = useState(null);
    const [darkMode] = useTheme();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result.split(",")[1]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const trimmedName = name.trim();
        if (!trimmedName) {
            toast.error("Nama produk tidak boleh kosong!");
            return;
        }

        const existingProductResponse = await fetch(`/api/product?name=${trimmedName}`);
        const existingProducts = await existingProductResponse.json();

        if (
            existingProducts.some(
                (product) => product.name.toLowerCase() === trimmedName.toLowerCase()
            )
        ) {
            toast.error(`Produk "${trimmedName}" sudah ada!`);
            return;
        }

        const newProduct = {
            name: trimmedName,
            price: parseInt(price, 10),
            stock: parseInt(stock, 10),
            img,
        };

        try {
            const response = await fetch("/api/product", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });

            if (response.ok) {
                toast.success("Produk berhasil ditambahkan!");
                onClose();
            } else {
                toast.error("Gagal menambahkan produk");
            }
        } catch (error) {
            console.error("Error adding product:", error);
            toast.error("Terjadi kesalahan saat menambahkan produk");
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex justify-center items-center">
            <div className={`p-6 rounded-lg shadow-lg w-96 transition-all duration-300
                ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
                <h2 className="text-xl font-semibold mb-4">Tambahkan Produk Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold">
                            Nama Produk
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-semibold">
                            Harga
                        </label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block text-sm font-semibold">
                            Stok
                        </label>
                        <input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="img" className="block text-sm font-semibold">
                            Gambar Produk
                        </label>
                        <input
                            id="img"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                                ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black border-gray-300"}`}
                        />
                    </div>
                    <div className="flex justify-end space-x-4 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-4 py-2 rounded-lg transition
                                ${darkMode ? "bg-gray-600 text-white hover:bg-gray-500" : "bg-gray-300 text-gray-700 hover:bg-gray-400"}`}
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
