import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products.repository";
import { Test } from "@nestjs/testing/test";
import { FindAllProductUseCase } from "./find-all.product";
import { CreateProductUseCase } from "./create.product";


describe("Find All Product Use Case", () => {

    let app: INestApplication
    let productsRepository: InMemoryProductsRepository
    let findAllProductUseCase: FindAllProductUseCase
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
        findAllProductUseCase = new FindAllProductUseCase(productsRepository)
        createProductUseCase = new CreateProductUseCase(productsRepository)
    })

    it("Shoud be able to find all products", async () => {

        for (let i = 1; i < 20; i++) {
            await createProductUseCase.execute({
                id: `test${i}`,
                name: "Difusor de teste",
                price: 4.50,
                description: `Lindo difusor número ${i} pra testar essa funcionalidade de criação`,
                images: ["wwww.minha-imagem.com"],
                available: true,
                category: "batizado"
            })
        }

        const products = await findAllProductUseCase.execute(20)
        expect(products).toEqual(expect.any(Array));
    })

})