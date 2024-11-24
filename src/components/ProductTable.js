import React from "react";
import ProductRow from "@/components/ProductRow";

const ProductTable = ({ products, onEdit, onDelete, search }) => {
    const filteredProducts = products.filter((product) => {
        // Periksa apakah product.name ada dan search adalah string
        const productName = product.name ? product.name.toLowerCase() : "";
        const searchQuery = search ? search.toLowerCase() : "";

        return productName.includes(searchQuery);
    });

    console.log("Filtered Products:", filteredProducts); // Debugging log

    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">Nama Produk</th>
                        <th className="px-4 py-3 text-left font-semibold">Harga</th>
                        <th className="px-4 py-3 text-left font-semibold">Stok</th>
                        <th className="px-4 py-3 text-left font-semibold">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductRow
                                key={product.id}
                                product={product}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                                No products found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};


export default ProductTable;
