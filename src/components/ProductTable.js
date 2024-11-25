import React, { useState } from "react";
import ProductRow from "@/components/ProductRow";
import Select from "react-select";

const ProductTable = ({ products, onEdit, onDelete, search }) => {
    const [sortColumn, setSortColumn] = useState("id");
    const [sortOrder, setSortOrder] = useState("asc");

    // Fungsi untuk mengurutkan data berdasarkan kolom yang dipilih
    const handleSort = (selectedOption) => {
        const [column, order] = selectedOption.value.split("-");
        setSortColumn(column);
        setSortOrder(order);
    };

    // Menyaring produk berdasarkan pencarian
    const filteredProducts = products.filter((product) => {
        const productName = product.name ? product.name.toLowerCase() : "";
        const searchQuery = search ? search.toLowerCase() : "";
        return productName.includes(searchQuery);
    });

    // Mengurutkan produk berdasarkan pilihan
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

    const sortOptions = [
        { value: "id-asc", label: "Urutkan berdasarkan (terbaru)" },
        { value: "name-asc", label: "Nama Produk (A-Z)" },
        { value: "name-desc", label: "Nama Produk (Z-A)" },
        { value: "price-asc", label: "Harga (terendah ke tertinggi)" },
        { value: "price-desc", label: "Harga (tertinggi ke terendah)" },
        { value: "stock-asc", label: "Stok (terendah ke terbanyak)" },
        { value: "stock-desc", label: "Stok (terbanyak ke terendah)" },
    ];

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "#FFFFFF", // Warna background dropdown agar konsisten dengan tabel
            borderColor: "#E2E8F0", // Warna border yang lebih terang
            borderRadius: "8px", // Sudut border yang sama dengan tabel
            padding: ".2rem", // Padding dalam kontrol
            boxShadow: "none", // Menghilangkan shadow default
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#FFFFFF", // Warna background menu dropdown
            borderColor: "#E2E8F0", // Border yang sama dengan kontrol
            borderRadius: "8px", // Sudut border menu
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#2D3748" : state.isFocused ? "#EDF2F7" : "white", // Warna background saat item dipilih atau difokuskan
            color: state.isSelected ? "white" : "#2D3748", // Warna teks item, sesuaikan dengan warna teks di tabel
            padding: "10px", // Padding item
            cursor: "pointer",
        }),
        singleValue: (provided) => ({
            ...provided,
            color: "#2D3748", // Warna teks untuk nilai yang terpilih (sesuai dengan warna teks di tabel)
        }),
    };
    
    return (
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <div className="flex justify-end mb-4">
                <Select
                    options={sortOptions}
                    onChange={handleSort}
                    styles={customStyles}
                    className="w-56 sm:w-72"
                    classNamePrefix="custom-select"
                />
            </div>

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
                    {sortedProducts.length > 0 ? (
                        sortedProducts.map((product) => (
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
