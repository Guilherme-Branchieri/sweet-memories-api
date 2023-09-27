import { PrismaService } from "@/prisma/prisma.service";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products.repository";
import { DeleteProductUseCase } from "../delete.product";

export function MakeDeleteProductUseCase() {
    const productRepository = new PrismaProductsRepository(new PrismaService)
    const deleteProductUseCase = new DeleteProductUseCase(productRepository)

    return deleteProductUseCase
}