import React from "react";
import ActionButtons from "@/components/ActionButtons";
import { formatToRupiah } from "@/utils/format"

const ProductRow = ({ product, onEdit, onDelete }) => {
    return (
        <tr className="odd:bg-gray-100 even:bg-gray-200 hover:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700 dark:hover:bg-gray-600 transition duration-200">
            <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white">
                {product.name}
            </td>
            <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white">
                {formatToRupiah(product.price || 0)}
            </td>
            <td className="px-4 py-3 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white">
                {product.stock || 0}
            </td>
            <td className="pl-4 py-3 border-b border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white">
                <ActionButtons
                    onEdit={onEdit ? () => onEdit(product.id) : null}
                    onDelete={onDelete ? () => onDelete(product.id) : null}
                />
            </td>
        </tr>
    );
};


export default ProductRow;
