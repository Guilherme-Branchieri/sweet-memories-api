import { PrismaService } from "@/prisma/prisma.service";
import { PrismaProductsRepository } from "../../repositories/prisma/prisma-products.repository";
import { EditProductUseCase } from "../edit.product";

export function MakeEditProductUseCase(){
    const productsRepository = new PrismaProductsRepository(new PrismaService)
    const editProductUseCase = new EditProductUseCase(productsRepository)
    return editProductUseCase
}