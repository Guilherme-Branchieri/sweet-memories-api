import { Product } from "@prisma/client";
import { ProductsRepository } from "../products.repository";

export class InMemoryProductsRepository implements ProductsRepository {

    public products: Product[] = []

    async create(data: Product): Promise<Product> {
        await this.products.push(data)
        return data
    }
    async findAll(page: number): Promise<Product[]> {
        const pageSize = 20;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = this.products.slice(startIndex, endIndex);
        return paginatedProducts;
    }
    async findById(id: string): Promise<Product | null> {
        const product = await this.products.find((product) => product.id === id)
        if (!product) {
            return null
        }
        return product
    }
    async findAllByCategory(category: string, page: number): Promise<Product[]> {
        const productsByCategory = this.products.filter((product) => product.category === category);
        console.log(productsByCategory)
        const pageSize = 20;
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = productsByCategory.slice(startIndex, endIndex);
        console.log(paginatedProducts + "paginated products ")
        return paginatedProducts;
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