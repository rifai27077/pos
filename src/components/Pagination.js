import React from "react";

const getVisiblePages = (totalPages, currentPage) => {
    const delta = 1; // Halaman di sekitar halaman aktif
    const range = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    for (let i = start; i <= end; i++) {
        range.push(i);
    }

    if (start > 2) range.unshift("...");
    if (start > 1) range.unshift(1);

    if (end < totalPages - 1) range.push("...");
    if (end < totalPages) range.push(totalPages);

    return range;
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const visiblePages = getVisiblePages(totalPages, currentPage);

    return (
        <div className="flex justify-end space-x-2">
            {currentPage > 1 && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    className="inline-flex items-center justify-center rounded border border-gray-300 bg-white text-gray-900"
                >
                    <span className="sr-only">Previous Page</span>
                    &lt;
                </button>
            )}
            {visiblePages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== "..." && onPageChange(page)}
                    className={`block size-8 rounded border ${
                        currentPage === page
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-gray-300 bg-white text-gray-900"
                    } text-center leading-8`}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="inline-flex items-center justify-center rounded border border-gray-300 bg-white text-gray-900"
                >
                    <span className="sr-only">Next Page</span>
                    &gt;
                </button>
            )}
        </div>
    );
};

export default Pagination;
