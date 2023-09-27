import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";
import { ROLE } from "@prisma/client";


describe("Delete product controller ", () => {

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
    test("[POST] /products/delete", async () => {
        const mockUser = {
            id: "test01",
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
            role: ROLE.ADMIN
        }
        await request(app.getHttpServer()).post("/accounts").send(mockUser)
        await prisma.user.update({
            data: { role: ROLE.ADMIN },
            where: {
                email: "tester@test.com"
            }
        })

        const tokens = await request(app.getHttpServer()).post("/sessions").send({
            email: "tester@test.com",
            password: "123123123"
        })

        await request(app.getHttpServer()).post("/products/create").set({ "Authorization": `Bearer ${tokens.body.access_token}` }).send({
            id: "product01",
            name: "Difusor de teste",
            price: 4.50,
            description: "Lindo difusor pra testar essa funcionalidade de criação",
            images: ["wwww.minha-imagem.com"],
            available: true,
            category: "batizado"
        })

        const response = await request(app.getHttpServer()).post("/products/delete").set({ "Authorization": `Bearer ${tokens.body.access_token}` }).send({
            id: "product01"
        })

        expect(response.statusCode).toStrictEqual(204)

        const checkProductDeletion = await prisma.product.findFirst({
            where: {
                id: "product01"
            }
        })

        expect(checkProductDeletion).toEqual(null)

    })
})