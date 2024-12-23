const TransactionTable = () => {
    const transactions = [
        { id: "TRX001", time: "2024-11-23 10:00", total: "Rp 500,000" },
        { id: "TRX002", time: "2024-11-23 11:15", total: "Rp 750,000" },
        { id: "TRX003", time: "2024-11-23 12:30", total: "Rp 1,200,000" },
    ];

    return (
        <div className="bg-gray-800 shadow-lg p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-5">Tabel Transaksi Terakhir</h2>
            <table className="min-w-full table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-3 border-b text-left text-slate-300">ID Transaksi</th>
                        <th className="p-3 border-b text-left text-slate-300">Waktu</th>
                        <th className="p-3 border-b text-left text-slate-300">Total Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-700">
                            <td className="p-3 border-b">{transaction.id}</td>
                            <td className="p-3 border-b">{transaction.time}</td>
                            <td className="p-3 border-b">{transaction.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionTable;
