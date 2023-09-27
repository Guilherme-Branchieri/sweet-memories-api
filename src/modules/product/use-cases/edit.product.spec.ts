import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products.repository";
import { CreateProductUseCase } from "./create.product";
import { Test } from "@nestjs/testing/test";
import { EditProductUseCase } from "./edit.product";


describe("Edit Product Use Case", () => {

    let app: INestApplication
    let productsRepository: InMemoryProductsRepository
    let createProductUseCase: CreateProductUseCase
    let editProductUseCase: EditProductUseCase

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
        editProductUseCase = new EditProductUseCase(productsRepository)
    })
    it("Shoud be able to edit an existing product", async () => {

        await createProductUseCase.execute({
            id: "product01",
            name: "Difusor de teste",
            price: 4.50,
            description: "Lindo difusor pra testar essa funcionalidade de criação",
            images: ["wwww.minha-imagem.com"],
            available: true,
            category: "batizado"
        })

        const data = {
            id: "product01",
            name: "Vela",
            price: 8.00,
            available: false,
            category: "casamento"

        }


        await editProductUseCase.execute({ data })

        expect(productsRepository.products).toBeTruthy()
        expect(productsRepository.products[0]).toMatchObject({
            id: expect.any(String),
            name: "Vela",
            price: 8.00,
            description: "Lindo difusor pra testar essa funcionalidade de criação",
            images: ["wwww.minha-imagem.com"],
            available: false,
            category: "casamento",
            updatedAt: expect.any(Date)
        })

    })

})