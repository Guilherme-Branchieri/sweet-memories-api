import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";
import { Product } from "@prisma/client";


describe("Find All Product Controller ", () => {

    let app: INestApplication
    let prisma: PrismaService

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        prisma = moduleRef.get(PrismaService)
        await app.init();
    });
    test("[GET] /products/list/all", async () => {
        for (let i = 1; i < 21; i++) {
            await prisma.product.createMany({
                data: {
                    id: `test0${i}`,
                    name: "Difusor de teste",
                    price: 4.50,
                    description: `Lindo difusor número 0${i} pra testar essa funcionalidade de criação`,
                    images: ["wwww.minha-imagem.com"],
                    available: true,
                    category: "batizado"
                }
            })
        }
        const response = await request(app.getHttpServer()).get("/products/list/all").send()
        const products = response.body
        console.log(products)
        expect(products).toEqual(expect.any(Array<Product>))
        expect(products).toHaveLength(20)
    })
})
