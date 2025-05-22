import Image from "next/image";
import { formatToRupiah } from "@/utils/format";

const ProductList = ({ products, addToCart }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-center">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="border border-gray-200 rounded-lg p-2 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    onClick={() => addToCart(product)}
                >
                    <div className="relative h-45 w-full min-h-[192px] mb-4">
                        <Image
                            src={product.img ? `data:image/jpeg;base64,${product.img}` : "/ai.png"}
                            alt={product.name}
                            className="object-cover rounded-lg"
                            layout="fill"
                        />

                    </div>

                    <h2 className="text-lg text-center font-semibold text-gray-900 mb-1 truncate">
                        {product.name}
                    </h2>
                    <p className="text-orange-600 text-center font-bold text-sm mb-1">
                        {formatToRupiah(product.price)}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
