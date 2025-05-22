import Image from "next/image";
import { formatToRupiah } from "@/utils/format";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Current Order</h2>
            <ul className="space-y-4">
                {cart.map((item) => (
                    <li key={item.id} className="flex items-center justify-between space-x-4 border-b pb-4">
                        <Image
                            src={item.img ? `data:image/jpeg;base64,${item.img}` : "/ai.png"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                            width={64}
                            height={64}
                        />
                        <div className="flex-1 ml-4">
                            <h3 className="text-sm font-semibold">{item.name}</h3>
                            <p className="text-gray-500 text-sm">{formatToRupiah(item.price)}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300 disabled:bg-gray-100"
                            >
                                -
                            </button>
                            <span className="text-lg font-medium">{item.quantity}</span>
                            <button
                                onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 bg-gray-200 rounded-lg flex justify-center items-center hover:bg-gray-300"
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-xl"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>

            {cart.length > 0 && (
                <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>{formatToRupiah(cart.reduce((acc, item) => acc + item.price * item.quantity, 0))}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
