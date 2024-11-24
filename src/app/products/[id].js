import { prisma } from "@/lib/prisma";

export default async function handler(req, res) {
    const { method, query: { id } } = req;

    if (method === "DELETE") {
        try {
            const productId = parseInt(id);

            if (isNaN(productId)) {
                return res.status(400).json({ message: "Invalid product ID" });
            }

            // Delete the product
            const product = await prisma.product.delete({
                where: {
                    id: productId,
                },
            });

            return res.status(200).json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error("Error deleting product:", error);
            return res.status(500).json({ message: "Failed to delete product" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}
