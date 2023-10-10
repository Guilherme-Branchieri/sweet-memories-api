import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest"
import { PrismaService } from "@/prisma/prisma.service";
import { ROLE } from "@prisma/client";
import { UserWithoutPasswordEntity } from "@/modules/user/entities/user-without-password.entity";


describe.only("Find All User Controller ", () => {

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
    test("[GET] /admin/users/list", async () => {
        await request(app.getHttpServer()).post("/accounts").send({
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
        })
        await prisma.user.update({
            data: { role: ROLE.ADMIN },
            where: {
                email: "tester@test.com"
            }
        })
        for (let i = 1; i < 20; i++) {
            await prisma.user.createMany({
                data: {
                    firstName: `test${i}`,
                    lastName: `boy${i}`,
                    email: `tester@test${i}.com`,
                    password: "123123123",
                    image: "",
                    phone: "54999999999",
                    adress: "Mock Street",
                    cep: "00000000",
                }
            })
        }

        const authenticateResponse = await request(app.getHttpServer()).post("/sessions").send({
            email: "tester@test.com",
            password: "123123123"
        })

        const { access_token } = authenticateResponse.body

        const findAllUsersReponse = await request(app.getHttpServer()).get("/admin/users/list").set({ "Authorization": `Bearer ${access_token}` }).send()
        const users = findAllUsersReponse.body

        expect(users).toEqual(expect.any(Array<UserWithoutPasswordEntity>))
        expect(users).toHaveLength(20)
        expect(users[1]).toMatchObject({
            id: expect.any(String),
            firstName: "test1",
            lastName: "boy1",
            email: "tester@test1.com",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
            role: "COMMON",
            createdAt: expect.stringMatching(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z)$/),
            updatedAt: null
        },)

    })
})



