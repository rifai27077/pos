import React, { useState, useEffect } from "react";
import Select from "react-select";
import Pagination from "./Pagination";
import { useTheme } from "@/app/context/theme-context";
import ActionButtons from "@/components/ActionButtons";
import { formatToRupiah } from "@/utils/format";

const ProductTable = ({ products, onEdit, onDelete, search }) => {
    const [darkMode] = useTheme();
    const [sortColumn, setSortColumn] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    const handleSort = (selectedOption) => {
        const [column, order] = selectedOption.value.split("-");
        setSortColumn(column);
        setSortOrder(order);
    };

    const filteredProducts = Array.isArray(products) && products.length > 0 
        ? products.filter((product) => {
            const productName = product.name ? product.name.toLowerCase() : "";
            const searchQuery = search ? search.toLowerCase() : "";
            return productName.includes(searchQuery);
        })
        : [];

    useEffect(() => {}, [search, sortColumn, sortOrder]);

    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortColumn === "stock") {
            return sortOrder === "asc" ? a.stock - b.stock : b.stock - a.stock;
        }
        if (sortColumn === "price") {
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        }
        if (sortColumn === "name") {
            return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return sortOrder === "asc" ? a.id - b.id : b.id - a.id;
    });

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page === "...") return;
        setCurrentPage(page);
    };
    
    const sortOptions = [
        { value: "id-asc", label: "ID (Kecil ke Besar)" },
        { value: "id-desc", label: "ID (Besar ke Kecil)" },
        { value: "name-asc", label: "Nama (A-Z)" },
        { value: "name-desc", label: "Nama (Z-A)" },
        { value: "price-asc", label: "Harga (Rendah ke Tinggi)" },
        { value: "price-desc", label: "Harga (Tinggi ke Rendah)" },
        { value: "stock-asc", label: "Stok (Sedikit ke Banyak)" },
        { value: "stock-desc", label: "Stok (Banyak ke Sedikit)" },
    ];    

    // Custom styles react-select dengan dark mode support
    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#1A202C" : "#FFFFFF",
            borderColor: darkMode ? "#4A5568" : "#E2E8F0",
            borderRadius: "8px",
            padding: ".2rem",
            boxShadow: "none",
            color: darkMode ? "#E2E8F0" : "#2D3748",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: darkMode ? "#2D3748" : "#FFFFFF",
            borderColor: darkMode ? "#4A5568" : "#E2E8F0",
            borderRadius: "8px",
            color: darkMode ? "#E2E8F0" : "#2D3748",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? (darkMode ? "#4A5568" : "#2D3748")
                : state.isFocused
                ? (darkMode ? "#2A4365" : "#EDF2F7")
                : darkMode
                ? "#1A202C"
                : "white",
            color: state.isSelected ? "white" : darkMode ? "#E2E8F0" : "#2D3748",
            padding: "10px",
            cursor: "pointer",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: darkMode ? "#E2E8F0" : "#2D3748",
        }),
    };

    const ProductRow = ({ product }) => {
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

    return (
        <div className={`space-y-4 transition-colors duration-300 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
            <div className="flex justify-end mb-4">
                <Select
                    options={sortOptions}
                    onChange={handleSort}
                    styles={customStyles}
                    className="w-56 sm:w-72"
                    classNamePrefix="custom-select"
                    placeholder="Urutkan berdasarkan..."
                    theme={(theme) => ({
                        ...theme,
                        colors: {
                            ...theme.colors,
                            primary25: darkMode ? "#2A4365" : "#EDF2F7",
                            primary: darkMode ? "#4A5568" : "#2D3748",
                            neutral0: darkMode ? "#1A202C" : "#fff",
                            neutral80: darkMode ? "#E2E8F0" : "#2D3748",
                        },
                    })}
                />
            </div>

            <div
                className={`overflow-x-auto shadow-lg rounded-lg
                    ${darkMode ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-300"}
                `}
            >
                <table className={`min-w-full rounded-lg transition-colors duration-300
                    ${darkMode ? "text-gray-200" : "text-gray-900"}
                `}>
                    <thead className={`${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-800 text-white"}`}>
                        <tr>
                            <th className="px-4 py-3 border-b text-left font-semibold text-sm sm:text-base">
                                Nama Produk
                            </th>
                            <th className="px-4 py-3 border-b text-left font-semibold text-sm sm:text-base">
                                Harga
                            </th>
                            <th className="px-4 py-3 border-b text-left font-semibold text-sm sm:text-base">
                                Stok
                            </th>
                            <th className="px-4 py-3 border-b text-left font-semibold text-sm sm:text-base">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <ProductRow
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className={`px-4 py-3 text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                                    Tidak ada produk yang ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot className={darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"}>
                        <tr>
                            <td colSpan="4" className="px-4 py-3 text-right">
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                    darkMode={darkMode}
                                />
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ProductTable;
