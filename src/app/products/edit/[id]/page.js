"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import LoadingSpin from "@/components/LoadingSpin";

const EditProductPage = () => {
    const { id } = useParams(); // Ambil id dari URL
    const [product, setProduct] = useState(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await fetch(`/api/products/${id}`);
            
                    if (!response.ok) {
                        throw new Error(`Failed to fetch product, status: ${response.status}`);
                    }
            
                    const data = await response.json();
                    console.log('Fetched product data:', data); // Log untuk debugging
                    setProduct(data);
                    setName(data.name);
                    setPrice(data.price);
                    setStock(data.stock);
                } catch (error) {
                    console.error("Error fetching product:", error);
                }
            };            

            fetchProduct();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Pastikan price diubah menjadi integer
        const updatedProduct = { 
            name, 
            price: parseInt(price, 10),  // Menggunakan parseInt untuk mengubah ke integer
            stock: parseInt(stock, 10)   // Menggunakan parseInt untuk stock
        };
    
        try {
            const response = await fetch(`/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
    
            if (!response.ok) {
                const errorData = await response.text();  // Ambil pesan error dari server
                throw new Error(`Failed to update product, status: ${response.status}, message: ${errorData}`);
            }
    
            // Jika berhasil, arahkan pengguna ke halaman produk
            window.location.href = "/products";  // Atau menggunakan router.push untuk navigasi tanpa reload
        } catch (error) {
            console.error("Error during product update:", error.message);
        }
    };

    if (!product) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <LoadingSpin />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Edit Produk</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-600">Nama Produk</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-lg font-medium text-gray-600">Harga</label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="stock" className="block text-lg font-medium text-gray-600">Stok</label>
                        <input
                            type="number"
                            id="stock"
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Perbarui Produk
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductPage;
