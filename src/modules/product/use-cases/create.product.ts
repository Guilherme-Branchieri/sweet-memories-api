import { Product } from "@prisma/client";
import { ProductsRepository } from "../repositories/products.repository";

type CreateProductUseCaseRequest = {
    id?: string
    name: string
    price: number
    description: string
    images: string[]
    available: boolean
    category: string

}

type CreateProductUseCaseResponse = {
    product: Product
}



export class CreateProductUseCase {
    constructor(private productsRepository: ProductsRepository) { }

    async execute({
        id, name, price, description, images, available, category
    }: CreateProductUseCaseRequest): Promise<CreateProductUseCaseResponse> {
        const product = await this.productsRepository.create({
            id: id?? id,
            name,
            price,
            description,
            images,
            available,
            category,
        })

        return { product }
    }
}