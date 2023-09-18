import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";


describe("Edit User Controller ", () => {

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
    test("[POST] /accounts/edit", async () => {
        await request(app.getHttpServer()).post("/accounts").send({
            id: "tester01",
            firstName: "tester",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000"
        })

        const authenticateUser = await request(app.getHttpServer()).post("/sessions").send({
            email: "tester@test.com",
            password: "123123123"
        })

        const userToken = authenticateUser.body.access_token
        const editUserRequest = await request(app.getHttpServer()).post("/accounts/edit")
            .set({ "Authorization": `Bearer ${userToken}` })
            .send({
                firstName: "mock",
                lastName: "tester",
                email: "mock_tester@test.com",
                password: "321321321",
                image: "www.mock-image.com/mock",
                phone: "54000000000",
                adress: "Mock Street",
                cep: "00000000"
            })

        const user = await prisma.user.findFirst({
            where: {
                id: editUserRequest.body
            }
        })

        expect(editUserRequest.statusCode).toStrictEqual(204)
        expect(user).toMatchObject({
            firstName: "mock",
            lastName: "tester",
            email: "mock_tester@test.com",
            password: "321321321",
            image: "www.mock-image.com/mock",
            phone: "54000000000",
            adress: "Mock Street",
            createdAt: expect.any(Date),
            cep: "00000000",
            updatedAt: expect.any(Date)
        })




        // expect(response.statusCode).toStrictEqual(200)
        // expect(response.body).toEqual({ access_token: expect.any(String) })
        // expect(response.body).toHaveProperty("access_token")


    })
})