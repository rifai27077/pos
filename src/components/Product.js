"use client";
import Image from "next/image";

const Product = ({ products, onDelete }) => {
    return (
        <>
            <h1 className="text-4xl font-bold text-gray-200 mb-6">Daftar Produk</h1>
            <button onClick={() => alert('Tambah Produk')} className="mb-6 px-6 py-3 bg-green-600 text-white rounded-lg">
                Tambah Produk
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <a key={product.id} className="group relative block overflow-hidden bg-white border rounded-lg shadow-md hover:shadow-lg">
                        <Image src={product.image} alt={product.name} width={300} height={200} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                        <div className="p-6">
                            <span className="bg-yellow-400 text-gray-800 px-3 py-1.5 text-xs font-medium">{product.category}</span>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
                            <p className="mt-1.5 text-sm text-gray-700">{product.description}</p>
                            <p className="text-lg font-bold text-gray-800 mt-2">${product.price}</p>
                            <button onClick={() => onDelete(product.id)} className="w-full py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg">
                                Hapus Produk
                            </button>
                        </div>
                    </a>
                ))}
            </div>
        </>
    );
};

export default Product;
