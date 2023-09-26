import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "./create";
import { EditUseCase } from "./edit";


describe("Edit User Use Case", () => {

    let app: INestApplication
    let usersRepository: InMemoryUsersRepository
    let createUserUseCase: CreateUserUseCase
    let editUseCase: EditUseCase

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
        createUserUseCase = new CreateUserUseCase(usersRepository)
        editUseCase = new EditUseCase(usersRepository)
    })

    it("Shoud be able to edit an existing user", async () => {

        const { user } = await createUserUseCase.execute({

            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
        })

        const data = {
            id: user.id,
            firstName: "Mario",
            lastName: "Gonzales",
            image: "google.com/mock-image",

        }


        await editUseCase.execute({ data })

        expect(usersRepository.users).toBeTruthy()
        expect(usersRepository.users[0]).toMatchObject({
            id: expect.any(String),
            firstName: "Mario",
            lastName: "Gonzales",
            email: "tester@test.com",
            password: expect.any(String),
            image: "google.com/mock-image",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
            role: "COMMON",
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date)
        })

    })

})