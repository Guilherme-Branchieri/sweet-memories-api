import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";


describe("Edit product controller ", () => {

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
    test("[POST] /products/edit", async () => {
        await request(app.getHttpServer()).post("/accounts").send({
            id: "test01",
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
            role: "ADMIN"
        })

        await prisma.user.update({ data: { role: "ADMIN" }, where: { email: "tester@test.com" } })

        const tokens = await request(app.getHttpServer()).post("/sessions").send({
            email: "tester@test.com",
            password: "123123123"
        })

        await prisma.product.create({
            data: {
                id: "product01",
                name: "Difusor de teste",
                price: 4.50,
                description: "Lindo difusor pra testar essa funcionalidade de criação",
                images: ["wwww.minha-imagem.com"],
                available: true,
                category: "batizado"
            }
        })

        const response = await request(app.getHttpServer()).post("/products/edit").set({ "Authorization": `Bearer ${tokens.body.access_token}` }).send({
            data: {
                id: "product01",
                name: "vela",
                price: 8.00,
                description: "Linda vela",
                images: ["wwww.minha-imagem.com"],
                available: false,
                category: "casamento"
            }
        })
        expect(response.statusCode).toStrictEqual(204)

        const updatedproduct = await prisma.product.findFirst({
            where: {
                id: "product01"
            }
        })
        expect(updatedproduct).toMatchObject({
            id: expect.any(String),
            name: "vela",
            price: 8.00,
            description: "Linda vela",
            images: ["wwww.minha-imagem.com"],
            available: false,
            category: "casamento",
            orderId: null,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        })
    })
})