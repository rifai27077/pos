"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductModal = ({ isOpen, onClose, onAddProduct }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [img, setImg] = useState(null);

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
    
        const existingProductResponse = await fetch(`/api/products?name=${trimmedName}`);
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
            const response = await fetch("/api/products", {
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
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tambahkan Produk Baru</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                            Nama Produk
                        </label>
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
                        <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                            Harga
                        </label>
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
                        <label htmlFor="stock" className="block text-sm font-semibold text-gray-700">
                            Stok
                        </label>
                        <input
                            id="stock"
                            type="number"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="img" className="block text-sm font-semibold text-gray-700">
                            Gambar Produk
                        </label>
                        <input
                            id="img"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-4 py-2 border border-gray-300 text-black rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
