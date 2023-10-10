import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing/test";
import { InMemoryAdminRepository } from "../repositories/in-memory/in-memory-admin.repository";
import { FindAllUserUseCase } from "./find-all-users.admin";
import { CreateUserUseCase } from "@/modules/user/use-cases/create.user";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users.repository";


describe("Find All Users Use Case", () => {

    let app: INestApplication
    let adminRepository: InMemoryAdminRepository
    let usersRepository: InMemoryUsersRepository
    let findAllUserUseCase: FindAllUserUseCase
    let createUserUseCase: CreateUserUseCase

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();
        app = moduleRef.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        usersRepository = new InMemoryUsersRepository()
        adminRepository = new InMemoryAdminRepository(usersRepository)
        createUserUseCase = new CreateUserUseCase(usersRepository)
        findAllUserUseCase = new FindAllUserUseCase(adminRepository)
    })

    it("Shoud be able to find all users", async () => {

        for (let i = 1; i <= 20; i++) {
            await createUserUseCase.execute({
                firstName: `test${i}`,
                lastName: `boy${i}`,
                email: `tester${i}@test.com`,
                password: "123123123",
                image: "",
                phone: "54999999999",
                adress: "Mock Street",
                cep: "00000000",
            })
        }

        const users = await findAllUserUseCase.execute()
        expect(users).toEqual(expect.any(Array));
        expect(users?.length).toStrictEqual(20)
    })
})