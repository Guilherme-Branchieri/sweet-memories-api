import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/products.repository";

export class FindAllProductUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute(page?: number): Promise<Product[]> {
        return page ? this.productsRepository.findAll(page) : this.productsRepository.findAll()
    }
}