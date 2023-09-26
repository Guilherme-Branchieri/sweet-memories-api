import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/products.repository";

type findAllByCategoryUseCaseRequest = {
    category: string,
    page?: number
}

type findAllByCategoryUseCaseResponse = {
    products: Product[]
}
export class FindAllByCategoryUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute({category, page}: findAllByCategoryUseCaseRequest): Promise<findAllByCategoryUseCaseResponse> {
        const products = await this.productsRepository.findAllByCategory(category, page)

        return {products}
    }
}