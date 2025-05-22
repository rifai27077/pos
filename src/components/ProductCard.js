"use client";
import Image from "next/image";

const ProductCard = ({ products, onDelete, onEdit }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
                <div key={product.id} className="group relative block overflow-hidden bg-white border rounded-lg shadow-md hover:shadow-lg">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="p-6">
                        <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>

                        <p className="text-lg font-bold text-gray-800 mt-2">Rp.{product.price}</p>

                        <p className="text-sm text-gray-600 mt-1">
                            Stok: <span className={`font-semibold ${product.stock <= 5 ? 'text-red-600' : 'text-green-600'}`}>{product.stock} unit</span>
                        </p>

                        <button
                            onClick={() => onEdit(product.id)}
                            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg mt-4"
                        >
                            Edit Produk
                        </button>

                        <button
                            onClick={() => onDelete(product.id)}
                            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg mt-2"
                        >
                            Hapus Produk
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCard;
