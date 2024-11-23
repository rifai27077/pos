import React from 'react';

const ProductTable = () => {
    const products = [
        { id: 1, name: 'Produk A', price: 10000, stock: 20 },
        { id: 2, name: 'Produk B', price: 15000, stock: 15 },
        { id: 3, name: 'Produk C', price: 20000, stock: 10 },
    ];

    return (
        <table className="w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Nama Produk</th>
            <th className="border border-gray-300 px-4 py-2">Harga</th>
            <th className="border border-gray-300 px-4 py-2">Stok</th>
            </tr>
        </thead>
        <tbody>
            {products.map((product) => (
            <tr key={product.id}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">Rp {product.price}</td>
                <td className="border border-gray-300 px-4 py-2">{product.stock}</td>
            </tr>
            ))}
        </tbody>
        </table>
    );
};

export default ProductTable;
