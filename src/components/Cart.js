"use client"
import React from 'react';

const Cart = ({ cartItems, onRemoveFromCart }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Cart</h3>
        {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
        ) : (
            <ul>
            {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span>${item.price}</span>
                <button
                    onClick={() => onRemoveFromCart(item.id)}
                    className="text-red-500"
                >
                    Remove
                </button>
                </li>
            ))}
            </ul>
        )}
        </div>
    );
};

export default Cart;
