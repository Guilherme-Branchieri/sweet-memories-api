import { Prisma, Product } from "@prisma/client";
import { ProductsRepository } from "../products.repository";
import { PrismaService } from "@/prisma/prisma.service";

export class PrismaProductsRepository implements ProductsRepository {
    constructor(private prisma: PrismaService) { }

    async create(data: Prisma.ProductCreateInput) {
        const product = await this.prisma.product.create({
            data
        })

        return product

    }
    async findAll(): Promise<Product[]> {
        const products = await this.prisma.product.findMany()

        return products
    }
    async findById(id: string): Promise<Product | null> {
        const product = await this.prisma.product.findUnique({ where: { id } })
        return product
    }
    async findAllByCategory(category: string) {
        const productsByCategory = await this.prisma.product.findMany({ where: { category: category } })
        return productsByCategory

    }
    async edit(data: Prisma.ProductUncheckedCreateInput): Promise<void> {
        await this.prisma.product.update({
            data,
            where: {
                id: data.id
            }
        })
    }

    async setNotAvailable(id: string): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const product = await this.prisma.product.update({
            where: { id: id },
            data: { available: false }
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.product.delete({
            where: { id: id }
        })
    }
}