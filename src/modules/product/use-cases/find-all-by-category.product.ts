import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/products.repository";

type findAllByCategoryUseCaseRequest = {
    category: string,
    page?: number
}

export class FindAllByCategoryUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute({ category, page }: findAllByCategoryUseCaseRequest): Promise<Product[]> {
        const products = await this.productsRepository.findAllByCategory(category, page?? page)

        return products
    }
}