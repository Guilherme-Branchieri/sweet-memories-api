import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";


describe("Create account controller ", () => {

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
    test("[POST] /accounts", async () => {
        const response = await request(app.getHttpServer()).post("/accounts").send({
            firstName: "test",
            lastName: "boy",
            email: "tester1@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000"
        })

        const checkUser = await prisma.user.findUnique({
            where: {
                email: "tester1@test.com"
            }
        })

        expect(response.statusCode).toStrictEqual(201)

        expect(checkUser).toBeTruthy()
    })
})