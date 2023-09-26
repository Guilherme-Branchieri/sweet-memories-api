import { PrismaService } from "@/prisma/prisma.service";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products.repository";
import { FindAllProductUseCase } from "../find-all.product";

export function MakeFindAllProductUseCase() {
    const productsRepository = new PrismaProductsRepository(new PrismaService)
    const findAllProductUseCase = new FindAllProductUseCase(productsRepository)

    return findAllProductUseCase
}