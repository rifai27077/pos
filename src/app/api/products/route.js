// src/app/api/product/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const products = await prisma.product.findMany();
        // Konversi Buffer ke Base64
        const productsWithBase64Images = products.map(product => ({
            ...product,
            img: product.img ? product.img.toString('base64') : null,
        }));

        return new Response(JSON.stringify(productsWithBase64Images), {
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
        const { name, price, stock, img } = await request.json();

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

export async function DELETE(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Mengambil id dari query parameter

    try {
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
        return new Response('Error deleting product', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}


export async function PUT(req, { params }) {
    const { id } = params;
    const { name, price, stock, img } = await req.json();

    console.log("Received Data:", { name, price, stock, img });  // Log data yang diterima dari frontend

    try {
        // Verifikasi format base64 dan buat buffer gambar
        const imageBuffer = img ? Buffer.from(img.split(',')[1], 'base64') : null;
        console.log("Image Buffer Length:", imageBuffer?.length); // Log panjang buffer

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, price, stock, img: imageBuffer },
        });

        console.log("Updated Product in DB:", updatedProduct); // Log produk yang diperbarui

        return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error); // Log error jika ada
        return new Response('Error updating product', { status: 500 });
    }
}
