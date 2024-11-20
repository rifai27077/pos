"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Product from "@/components/Product";

export default function Products() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const [products, setProducts] = useState([
        {
            id: 1,
            name: 'Product 1',
            price: 50,
            category: 'Category 1',
            image: '/ai.jpg',
            description: 'Description for product 1.',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 30,
            category: 'Category 2',
            image: '/ai.jpg',
            description: 'Description for product 2.',
        },
        {
            id: 3,
            name: 'Product 3',
            price: 70,
            category: 'Category 3',
            image: '/ai.jpg',
            description: 'Description for product 3.',
        },
        {
            id: 4,
            name: 'Product 4',
            price: 100,
            category: 'Category 4',
            image: '/ai.jpg',
        },
        {
            id: 5,
            name: 'Product 5',
            price: 200,
            category: 'Category 5',
            image: '/ai.jpg',
            description: 'Description for product 5.',
        },
        {
            id: 6,
            name: 'Product 6',
            price: 150,
            category: 'Category 6',
            image: '/ai.jpg',
            description: 'Description for product 6.',
        },
        {
            id: 7,
            name: 'Product 7',
            price: 80,
            category: 'Category 7',
            image: '/ai.jpg',
            description: 'Description for product 7.',
        },
        
    ]);

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="flex">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div className="flex flex-col flex-1 md:ml-64">
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="p-4">
                    <Product products={products} onDelete={handleDeleteProduct} />
                </main>
            </div>
            {isSidebarOpen && (
                <div onClick={closeSidebar} className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"></div>
            )}
        </div>
    );
}
