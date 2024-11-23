"use client";
import React, { useState } from "react";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
    const [products, setProducts] = useState([
        { id: "P001", name: "Produk A", price: 100000, stock: 10, image: "/images/product1.jpg" },
        { id: "P002", name: "Produk B", price: 150000, stock: 5, image: "/images/product2.jpg" },
        { id: "P003", name: "Produk C", price: 200000, stock: 20, image: "/images/product3.jpg" },
    ]);

    const handleAddProduct = () => {
        alert("Formulir tambah produk dibuka");
    };

    const handleEditProduct = (id) => {
        alert(`Edit produk dengan ID: ${id}`);
    };

    const handleDeleteProduct = (id) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Daftar Produk</h1>
            
            {/* Tombol untuk menambah produk */}
            <button onClick={handleAddProduct} className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg">
                Tambah Produk
            </button>
            
            {/* Menampilkan daftar produk */}
            <ProductCard products={products} onDelete={handleDeleteProduct} onEdit={handleEditProduct} />
        </div>
    );
};

export default ProductsPage;
