import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products.repository";
import { Test } from "@nestjs/testing/test";
import { CreateProductUseCase } from "./create.product";
import { FindAllByCategoryUseCase } from "./find-all-by-category.product";


describe("Find All Product By Category Use Case", () => {

    let app: INestApplication
    let productsRepository: InMemoryProductsRepository
    let findAllByCategoryUseCase: FindAllByCategoryUseCase
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
        findAllByCategoryUseCase = new FindAllByCategoryUseCase(productsRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository)
    })

    it("Shoud be able to find all products by category", async () => {

        for (let i = 1; i < 20; i++) {
            await createProductUseCase.execute({
                id: `test${i}`,
                name: "Difusor de teste",
                price: 4.50,
                description: `Lindo difusor número ${i} pra testar essa funcionalidade`,
                images: ["wwww.minha-imagem.com"],
                available: true,
                category: "batizado"
            })
        }

        for (let i = 1; i < 20; i++) {
            await createProductUseCase.execute({
                id: `test${i}`,
                name: "Velas aromáticas",
                price: 4.50,
                description: `Lindas velas número ${i} pra testar essa funcionalidade`,
                images: ["wwww.minha-imagem.com"],
                available: true,
                category: "casamento"
            })
        }

        const products = await findAllByCategoryUseCase.execute({ category: "casamento", page: 20 })
        expect(products).toEqual(expect.any(Array));
        expect(products.map((products) => products.category === "casamento")).toBeTruthy()
    })

})