import React from "react";
import ActionButtons from "@/components/ActionButtons";
import { formatToRupiah } from "@/utils/format"

const ProductRow = ({ product, onEdit, onDelete }) => {
    return (
        <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-50 transition duration-200">
            <td className="px-4 py-3 border-b text-gray-700">{product.name}</td>
            <td className="px-4 py-3 border-b text-gray-700">{formatToRupiah(product.price || 0)}</td>
            <td className="px-4 py-3 border-b text-gray-700">{product.stock || 0}</td>
            <td className="px-4 py-3 border-b text-gray-700">
                <ActionButtons
                    onEdit={onEdit ? () => onEdit(product.id) : null}
                    onDelete={onDelete ? () => onDelete(product.id) : null}
                />
            </td>
        </tr>
    );
};

export default ProductRow;
