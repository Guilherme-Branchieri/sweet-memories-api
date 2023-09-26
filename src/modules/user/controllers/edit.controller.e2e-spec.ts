import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users.repository";


describe("Edit User Controller", () => {

    let app: INestApplication
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let prisma: PrismaService

    let usersRepository: PrismaUsersRepository

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        prisma = moduleRef.get(PrismaService)
        usersRepository = new PrismaUsersRepository(prisma)
        await app.init();
    });
    test("[POST] /accounts/edit", async () => {

        await request(app.getHttpServer()).post("/accounts").send({
            id: "test01",
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000"
        })

        const tokens = await request(app.getHttpServer()).post("/sessions").send({
            email: "tester@test.com",
            password: "123123123"
        })

        const data = {
            id: "test01",
            firstName: "Mario",
            lastName: "Gonzales",
            image: "google.com/mock-image"
        }

        const response = await request(app.getHttpServer()).post("/accounts/edit").set({ "Authorization": `Bearer ${tokens.body.access_token}` }).send(data)

        const user = await usersRepository.findByEmail("tester@test.com")

        expect(response.statusCode).toStrictEqual(204)
        expect(user?.firstName).toEqual("Mario")
        expect(user?.lastName).toEqual("Gonzales")



    })
})