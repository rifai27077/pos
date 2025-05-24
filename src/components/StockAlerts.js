import React, { useState, useEffect } from "react";
import { useTheme } from "@/app/context/theme-context";

const StockAlerts = () => {
    const [products, setProducts] = useState([]);
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [darkMode] = useTheme()
    const threshold = 10;

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/produk');
            console.log("Response status:", response.status);
            if (!response.ok) {
                throw new Error(`Failed to fetch products, status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Fetched Products:", data);
            setProducts(data); 
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const lowStock = products.filter((product) => product.stock < threshold);
        setLowStockProducts(lowStock);
    }, [products]);

    return (
        <div className={`shadow-md p-4 rounded-lg transition-colors duration-300 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className={`text-lg font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>Stok Menipis</h2>

            {lowStockProducts.length > 0 ? (
                <ul>
                    {lowStockProducts.map((product) => (
                        <li key={product.id} className="text-red-500">
                            Produk
                            <span className="font-semibold">{" "}{product.name}</span>{" "}
                            hanya tersisa {product.stock} saja
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-green-500">Semua produk tersedia dengan stok yang cukup.</p>
            )}
        </div>
    );
};

export default StockAlerts;
