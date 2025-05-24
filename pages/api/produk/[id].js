// pages/api/produk/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const product = await prisma.product.findUnique({
                where: {
                    id: parseInt(id),
                },
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching product' });
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === 'PUT') {
        try {
            const { name, price, stock, img } = req.body;
            const updatedProduct = await prisma.product.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    name,
                    price: parseInt(price),
                    stock: parseInt(stock),
                    img: img ? Buffer.from(img.split(',')[1], 'base64') : null,
                },
            });

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product' });
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === 'DELETE') {
        try {
            const deletedProduct = await prisma.product.delete({
                where: {
                    id: parseInt(id),
                },
            });

            res.status(200).json(deletedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product' });
        } finally {
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
