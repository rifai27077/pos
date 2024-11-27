import { formatToRupiah } from "@/utils/format";

const Checkout = ({ subtotal, openPaymentModal }) => {
    return (
        <div className="mt-6 p-4 border-t bg-white rounded-lg">
            <div className="space-y-2">
                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatToRupiah(subtotal)}</span>
                </div>
            </div>
            <button onClick={openPaymentModal} className="w-full bg-orange-500 text-white py-2 mt-4 rounded-lg">
                Continue to Payment
            </button>
        </div>
    );
};

export default Checkout;
