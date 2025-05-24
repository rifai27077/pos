import React from "react";

const getVisiblePages = (totalPages, currentPage) => {
    const delta = 1;
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
                    className="p-1 inline-flex items-center justify-center rounded border border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <span className="sr-only">Previous Page</span>
                    &lt;
                </button>
            )}
            {visiblePages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => page !== "..." && onPageChange(page)}
                    className={`block size-8 rounded border text-center leading-8 ${
                        currentPage === page
                            ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                            : "border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                >
                    {page}
                </button>
            ))}
            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="p-1 inline-flex items-center justify-center rounded border border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <span className="sr-only">Next Page</span>
                    &gt;
                </button>
            )}
        </div>
    );
};


export default Pagination;
