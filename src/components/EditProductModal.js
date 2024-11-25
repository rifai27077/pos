"use client"

import React, { useState } from "react";
import { toast } from "react-toastify"; // Import toast untuk notifikasi
import "react-toastify/dist/ReactToastify.css"; // Import CSS untuk Toastify

const EditProductModal = ({ product, onClose, onUpdate }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProduct = { name, price, stock };

        try {
            const response = await fetch(`/api/products/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (response.ok) {
                toast.success("Product updated successfully!"); // Menampilkan notifikasi sukses
                onUpdate(); // Update the product list after edit
                onClose(); // Close the modal
            } else {
                toast.error("Failed to update product"); // Menampilkan notifikasi error
            }
        } catch (error) {
            toast.error("Error updating product"); // Menampilkan notifikasi error
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-4">Edit Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg">Product Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-lg">Price</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full p-3 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="stock" className="block text-lg">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full p-3 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded">
                            Update Product
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-6 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProductModal;
