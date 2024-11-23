import React, { useState, useEffect } from "react";

const StockAlerts = () => {
    // Data produk dengan stoknya
    const [products, setProducts] = useState([
        { id: "P001", name: "Produk A", stock: 10, threshold: 15 },
        { id: "P002", name: "Produk B", stock: 5, threshold: 10 },
        { id: "P003", name: "Produk C", stock: 20, threshold: 30 },
    ]);

    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [threshold, setThreshold] = useState([10]);

    useEffect(() => {
        // Memfilter produk yang stoknya kurang dari threshold
        const lowStock = products.filter(
            (product) => product.stock <= threshold
        );
        setLowStockProducts(lowStock);
    }, [threshold, products]);

    return (
        <div className="bg-gray-800 shadow-md p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-3">Notifikasi Stok Menipis</h2>

            {lowStockProducts.length > 0 ? (
                <ul>
                    {lowStockProducts.map((product) => (
                        <li key={product.id} className="text-red-500">
                            <span className="font-semibold">{product.name}</span>:{" "}
                            Stok hanya {product.stock} unit (terbatas)
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-green-500">Semua produk tersedia dengan stok cukup.</p>
            )}
        </div>
    );
};

export default StockAlerts;
