import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products.repository";
import { CreateProductUseCase } from "./create";
import { Test } from "@nestjs/testing/test";


describe("Create Product Use Case", () => {

    let app: INestApplication
    let productsRepository: InMemoryProductsRepository
    let createProductUseCase: CreateProductUseCase

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        productsRepository = new InMemoryProductsRepository()
        createProductUseCase = new CreateProductUseCase(productsRepository)
    })

    it("Shoud be able to create a new product", async () => {
        const mockProduct = {
            id: "test01",
            name: "Difusor de teste",
            price: 4.50,
            description: "Lindo difusor pra testar essa funcionalidade de criação",
            images: ["wwww.minha-imagem.com"],
            available: true,
            category: "batizado"
        }
        const { product } = await createProductUseCase.execute(mockProduct)
        expect(product).toEqual(expect.any(Object));
        expect(product.id).toEqual(expect.any(String))
        expect(product).toHaveProperty("price")
        expect(product.available).toBeTruthy()
        expect(product.updatedAt).toBe(null || undefined)
    })

})