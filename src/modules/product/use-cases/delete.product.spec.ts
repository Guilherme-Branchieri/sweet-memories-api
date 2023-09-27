import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { InMemoryProductsRepository } from "../repositories/in-memory/in-memory-products.repository";
import { CreateProductUseCase } from "./create.product";
import { Test } from "@nestjs/testing/test";
import { DeleteProductUseCase } from "./delete.product";


describe("Delete Product Use Case", () => {

    let app: INestApplication
    let productsRepository: InMemoryProductsRepository
    let createProductUseCase: CreateProductUseCase
    let deleteProductUseCase: DeleteProductUseCase

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
        deleteProductUseCase = new DeleteProductUseCase(productsRepository)
    })

    it("Shoud be able to delete a product given product ID", async () => {
        const { product } = await createProductUseCase.execute({
            id: "test01",
            name: "Difusor de teste",
            price: 4.50,
            description: "Lindo difusor pra testar essa funcionalidade de criação",
            images: ["wwww.minha-imagem.com"],
            available: true,
            category: "batizado"
        })

        expect(product).toEqual(expect.any(Object))

        await deleteProductUseCase.execute(product.id)

        const findProduct = productsRepository.products.find((product) => product)
        console.log(findProduct)

        expect(productsRepository.products[0]).toBeFalsy()
    })

})