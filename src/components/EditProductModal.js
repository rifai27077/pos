import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductModal = ({ product, onClose, onUpdate }) => {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);
    const [img, setImg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // State untuk dark mode
    const [darkMode, setDarkMode] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(reader.result);
        };
        reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (price <= 0 || stock < 0) {
        toast.error("Price and stock must be positive values!");
        return;
        }

        const updatedProduct = { name, price, stock, img };

        try {
        setIsLoading(true);
        const response = await fetch(`/api/product/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        });

        const responseBody = await response.json();

        if (response.ok) {
            toast.success("Product updated successfully!");
            onUpdate();
            onClose();
        } else {
            toast.error("Failed to update product");
        }
        } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Error updating product");
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center`}
        >
        <div
            className={`p-8 rounded-lg w-full max-w-md
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}
            `}
        >
            {/* Toggle Dark Mode */}
            <div className="flex justify-end mb-4">
            <label className="inline-flex items-center cursor-pointer">
                <input
                type="checkbox"
                className="sr-only"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                />
                <div
                className={`w-10 h-6 flex items-center bg-gray-300 rounded-full p-1
                    ${darkMode ? "bg-gray-700" : "bg-gray-300"}
                `}
                >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300
                    ${darkMode ? "translate-x-4" : ""}
                    `}
                />
                </div>
                <span className="ml-3 text-sm">{darkMode ? "Dark Mode" : "Light Mode"}</span>
            </label>
            </div>

            <h2 className="text-2xl font-semibold text-center mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-lg">
                Product Name
                </label>
                <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full p-3 border rounded
                    ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}
                `}
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-lg">
                Price
                </label>
                <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`w-full p-3 border rounded
                    ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}
                `}
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="stock" className="block text-lg">
                Stock
                </label>
                <input
                type="number"
                id="stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className={`w-full p-3 border rounded
                    ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}
                `}
                required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="img" className="block text-lg">
                Product Image
                </label>
                <input
                type="file"
                id="img"
                accept="image/*"
                onChange={handleImageChange}
                className={`w-full p-3 border rounded
                    ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}
                `}
                />
                {img && (
                <div className="mt-2">
                    <Image
                    src={img}
                    alt="Preview"
                    className="object-cover"
                    width={128}
                    height={128}
                    />
                </div>
                )}
            </div>
            <div className="flex justify-between">
                <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
                disabled={isLoading}
                >
                {isLoading ? "Updating..." : "Update Product"}
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
