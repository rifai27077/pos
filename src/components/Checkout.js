"use client"
import React from 'react';

const Checkout = ({ totalAmount }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Checkout</h3>
        <p className="text-lg mt-2">Total: ${totalAmount}</p>
        <button className="mt-4 bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">
            Complete Purchase
        </button>
        </div>
    );
};

export default Checkout;
