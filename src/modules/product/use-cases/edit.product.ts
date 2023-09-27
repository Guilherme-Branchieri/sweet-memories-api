import { ProductsRepository } from "../repositories/products.repository";
import { NotFoundException } from "@nestjs/common";

type EditProductUseCaseRequest = {
    data: {
        id: string
        name?: string
        price?: number
        description?: string
        images?: string[]
        available?: boolean
        category?: string
    }
}



export class EditProductUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute({
        data
    }: EditProductUseCaseRequest): Promise<void> {
        const product = await this.productsRepository.findById(data.id)
        if (!product) {
            throw new NotFoundException("Product not found")
        }
        const updatedproduct = {
            ...product,
            ...data,
            updatedAt: new Date(),
        }
        await this.productsRepository.edit(updatedproduct)

    }
}