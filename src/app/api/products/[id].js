import prisma from '../../../../lib/prisma'; // Pastikan path ke Prisma Client benar

export default async function handler(req, res) {
    const { id } = req.query; // Ambil ID dari URL parameter

    if (req.method === 'GET') {
        try {
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) }, // Temukan produk berdasarkan ID
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' }); // Jika produk tidak ditemukan
        }

        res.status(200).json(product); // Kembalikan data produk
        } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ message: 'Internal server error' }); // Tangani kesalahan
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' }); // Jika bukan GET
    }
}
