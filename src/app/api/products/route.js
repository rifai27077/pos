// src/app/api/product/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany();

        // Convert binary image data to base64
        const productsWithImages = products.map((product) => {
            if (product.img) {
                const base64Image = product.img.toString('base64');
                return {
                    ...product,
                    img: `data:image/png;base64,${base64Image}`,
                };
            }
            return product;
        });

        return new Response(JSON.stringify(productsWithImages), {
            status: 200,
        });
    } catch (error) {
        return new Response('Error fetching products', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(request) {
    try {
        const { name, price, stock, img } = await request.json(); // Ambil data dari body request

        const newProduct = await prisma.product.create({
            data: {
                name,
                price,
                stock,
                img: img ? Buffer.from(img, "base64") : null,
            },
        });

        return new Response(JSON.stringify(newProduct), {
            status: 201,
        });
    } catch (error) {
        return new Response('Error adding product', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Endpoint DELETE untuk menghapus produk berdasarkan id
export async function DELETE(req, { params }) {
    const { id } = params;

    try {
        // Menghapus produk berdasarkan id
        const deletedProduct = await prisma.product.delete({
            where: {
                id: parseInt(id),
            },
        });

        return new Response(JSON.stringify(deletedProduct), {
            status: 200,
        });
    } catch (error) {
        console.error('Error deleting product:', error);
        return new Response('Error deleting product', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

// Endpoint PUT untuk memperbarui produk berdasarkan id
export async function PUT(req, { params }) {
    const { id } = params;
    const { name, price, stock } = await req.json();

    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                price,
                stock,
                img,
            },
        });

        return new Response(JSON.stringify(updatedProduct), {
            status: 200,
        });
    } catch (error) {
        console.error('Error updating product:', error);
        return new Response('Error updating product', {
            status: 500,
        });
    } finally {
        await prisma.$disconnect();
    }
}

