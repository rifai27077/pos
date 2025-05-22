// src/app/api/product/[id]/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Endpoint DELETE untuk menghapus produk berdasarkan id
export async function DELETE(req, { params }) {
    const { id } = params; // Mengambil id dari parameter URL

    try {
        // Menghapus produk berdasarkan id
        const deletedProduct = await prisma.product.delete({
            where: {
                id: parseInt(id), // Pastikan id diubah ke integer
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

// Endpoint GET untuk mengambil produk berdasarkan ID
export async function GET(req, { params }) {
    const { id } = params;  // Ambil ID dari URL

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: parseInt(id),  // Pastikan id diubah ke integer
            },
        });

        if (!product) {
            return new Response("Product not found", { status: 404 });
        }

        return new Response(JSON.stringify(product), { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return new Response("Error fetching product", { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

// Endpoint PUT untuk memperbarui produk berdasarkan id
export async function PUT(req, { params }) {
    const { id } = params;
    const { name, price, stock } = await req.json();

    // Pastikan bahwa price dan stock diubah menjadi integer
    const parsedPrice = parseInt(price, 10);
    const parsedStock = parseInt(stock, 10);

    console.log('Received data:', { name, parsedPrice, parsedStock }); // Debugging log

    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                price: parsedPrice,  // Memastikan price adalah integer
                stock: parsedStock,   // Memastikan stock adalah integer
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
