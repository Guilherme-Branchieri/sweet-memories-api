import { CreateProductUseCase } from "../create";
import { PrismaService } from "@/prisma/prisma.service";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products.repository";

export function MakeCreateProductUseCase() {
    const productRepository = new PrismaProductsRepository(new PrismaService)
    const createProductUseCase = new CreateProductUseCase(productRepository)

    return createProductUseCase
}