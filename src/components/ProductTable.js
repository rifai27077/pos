import React, { useState, useEffect } from "react";
import ProductRow from "@/components/ProductRow";
import Select from "react-select";
import Pagination from "@/components/Pagination";

const ProductTable = ({ products, onEdit, onDelete, search }) => {
    const [sortColumn, setSortColumn] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1); // Tambahkan state untuk halaman
    const itemsPerPage = 7; // Tentukan jumlah item per halaman

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

    useEffect(() => {
        setCurrentPage(1); // Reset ke halaman pertama jika search atau sort berubah
    }, [search, sortColumn, sortOrder]);

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

    const totalPages = Math.ceil(sortedProducts.length / itemsPerPage); // Total halaman
    const paginatedProducts = sortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ); // Data untuk halaman saat ini

    const handlePageChange = (page) => {
        if (page === "...") return; // Jangan perbarui halaman jika '...'
        setCurrentPage(page); // Update currentPage hanya jika bukan '...'
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

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "#FFFFFF",
            borderColor: "#E2E8F0",
            borderRadius: "8px",
            padding: ".2rem",
            boxShadow: "none",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#FFFFFF",
            borderColor: "#E2E8F0",
            borderRadius: "8px",
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#2D3748" : state.isFocused ? "#EDF2F7" : "white",
            color: state.isSelected ? "white" : "#2D3748",
            padding: "10px",
            cursor: "pointer",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#2D3748",
        }),
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end mb-4">
                <Select
                    options={sortOptions}
                    onChange={handleSort}
                    styles={customStyles}
                    className="w-56 sm:w-72"
                    classNamePrefix="custom-select"
                    placeholder="Urutkan berdasarkan..."
                />
            </div>
    
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">
                                Nama Produk
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">
                                Harga
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">
                                Stok
                            </th>
                            <th className="px-4 py-3 text-left font-semibold text-sm sm:text-base">
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
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-4 py-3 text-center text-gray-500">
                                    Tidak ada produk yang ditemukan
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="4" className="px-4 py-3 text-right">
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
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
