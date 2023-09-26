import { Prisma, Product } from "@prisma/client"

export type ProductsRepository = {
    create(data: Prisma.ProductCreateInput): Promise<Product>;
    findAll(page?: number): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    findAllByCategory(category: string, page?: number): Promise<Product[]>
    edit(data: Prisma.ProductUncheckedUpdateInput): Promise<void>
    setNotAvailable(id: string): Promise<void>
    delete(id: string): Promise<void>
}