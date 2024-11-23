"use client"

import React, { useState } from 'react';

const ProductForm = () => {
    const [form, setForm] = useState({
        name: '',
        price: '',
        stock: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Produk ditambahkan:', form);
        setForm({ name: '', price: '', stock: '' });
    };

    return (
        <form className="mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap-4">
            <input
            type="text"
            name="name"
            placeholder="Nama Produk"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded"
            />
            <input
            type="number"
            name="price"
            placeholder="Harga"
            value={form.price}
            onChange={handleChange}
            className="border p-2 rounded"
            />
            <input
            type="number"
            name="stock"
            placeholder="Stok"
            value={form.stock}
            onChange={handleChange}
            className="border p-2 rounded"
            />
        </div>
        <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
            Tambahkan Produk
        </button>
        </form>
    );
};

export default ProductForm;
