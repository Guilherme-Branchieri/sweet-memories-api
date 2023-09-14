import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";


describe("Create account controller ", () => {

    let app: INestApplication
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    test("[POST] /accounts", async () => {
        await request(app.getHttpServer()).post("/accounts").send({
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000"
        })

        const response = await request(app.getHttpServer()).post("/sessions").send({
            email: "tester@test.com",
            password: "123123123"
        })



        expect(response.statusCode).toStrictEqual(200)
        expect(response.body).toEqual({ access_token: expect.any(String) })
        expect(response.body).toHaveProperty("access_token")


    })
})