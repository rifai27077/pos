// ProductList.js
import React from "react";
import ProductCard from "@/components/ProductCard";

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ProductList;
