import { Product } from "@prisma/client";
import { ProductsRepository } from "../products.repository";

export class InMemoryProductsRepository implements ProductsRepository {
    
    public products: Product[] = []

    async create(data: Product): Promise<Product> {
        await this.products.push(data)
        return data
    }
    async findAll(): Promise<Product[]> {
        const products = this.products
        return products
    }
    async findById(id: string): Promise<Product | null> {
        const product = await this.products.find((product) => product.id === id)
        if (!product) {
            return null
        }
        return product
    }
    async findAllByCategory(category: string): Promise<Product[]> {
        const products = await this.products.filter((product) => product.category === category)
        return products
    }
    async edit(updateProduct: Product): Promise<void> {
        const index = this.products.findIndex((product) => product.id === updateProduct.id);
        if (index !== -1) {
            this.products[index] = updateProduct;
        }
    }
    async setNotAvailable(id: string): Promise<void> {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index].available = false;
        }
    }
    async delete(id: string): Promise<void> {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1)
        }
    }

}