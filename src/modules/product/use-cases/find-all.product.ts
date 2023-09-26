import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/products.repository";

export class FindAllProductUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute(page?: number): Promise<Product[]> {
        const products = await this.productsRepository.findAll(page?? page)

        return products
    }
}