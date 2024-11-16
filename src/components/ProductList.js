"use client"
import React from 'react';

const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
];

const ProductList = ({ onAddToCart }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-500">Price: ${product.price}</p>
            <button
                onClick={() => onAddToCart(product)}
                className="mt-4 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
                Add to Cart
            </button>
            </div>
        ))}
        </div>
    );
};

export default ProductList;
