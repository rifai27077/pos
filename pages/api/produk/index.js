// pages/api/produk/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const products = await prisma.product.findMany();
            const productsWithBase64Images = products.map(product => ({
                ...product,
                img: product.img ? product.img.toString('base64') : null,
            }));
            res.status(200).json(productsWithBase64Images);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching products' });
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === 'POST') {
        try {
            const { name, price, stock, img } = req.body;
            const newProduct = await prisma.product.create({
                data: {
                    name,
                    price,
                    stock,
                    img: img ? Buffer.from(img, "base64") : null,
                },
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error adding product' });
        } finally {
            await prisma.$disconnect();
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query;
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
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
