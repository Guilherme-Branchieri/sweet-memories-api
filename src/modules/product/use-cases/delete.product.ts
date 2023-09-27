import { ProductsRepository } from "../repositories/products.repository";
import { InvalidProductException } from "@/common/exceptions/product/invalid-product-exception";
import { ProductNotFoundException } from "@/common/exceptions/product/product-not-found-exception";

export class DeleteProductUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute(id: string): Promise<void> {
        if (!id) {
            throw new InvalidProductException()
        }

        const product = await this.productsRepository.findById(id)
        if (!product) {
            throw new ProductNotFoundException()
        }

        await this.productsRepository.delete(id)
    }
}