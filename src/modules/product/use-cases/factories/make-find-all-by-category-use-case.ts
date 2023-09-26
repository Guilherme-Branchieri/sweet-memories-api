import { PrismaService } from "@/prisma/prisma.service";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products.repository";
import { FindAllByCategoryUseCase } from "../find-all-by-category.product";

export function MakeFindAllProductByCategoryUseCase() {
    const productsRepository = new PrismaProductsRepository(new PrismaService())
    const findAllProductByCategoryUseCase = new FindAllByCategoryUseCase(productsRepository)
    return findAllProductByCategoryUseCase
}