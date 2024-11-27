const Payment = ({ closePaymentModal }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Pembayaran</h2>
            <form>
                {/* Form untuk memilih metode pembayaran */}
                <button className="bg-green-500 p-2 rounded text-white" onClick={closePaymentModal}>
                    Bayar
                </button>
            </form>
        </div>
    );
};

export default Payment;