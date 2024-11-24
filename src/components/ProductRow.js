// src/components/ProductRow.js
import React from "react";
import ActionButtons from "@/components/ActionButtons";
import { formatToRupiah } from "@/utils/format"; // Pastikan lokasi fungsi sesuai

const ProductRow = ({ product, onEdit, onDelete }) => {
    return (
        <tr className="odd:bg-gray-100 even:bg-white hover:bg-blue-50 transition duration-200">
            <td className="px-4 py-3 border-b text-gray-700">{product.name}</td>
            <td className="px-4 py-3 border-b text-gray-700">{formatToRupiah(product.price)}</td>
            <td className="px-4 py-3 border-b text-gray-700">{product.stock}</td>
            <td className="px-4 py-3 border-b text-gray-700">
                <ActionButtons
                    onEdit={() => onEdit(product.id)}  // Pastikan onEdit dipanggil dengan id produk
                    onDelete={() => onDelete(product.id)}  // Pastikan onDelete dipanggil dengan id produk
                />
            </td>
        </tr>
    );
};

export default ProductRow;
