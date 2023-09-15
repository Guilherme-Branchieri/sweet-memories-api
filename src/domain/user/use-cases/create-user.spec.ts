import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { ConflictException, INestApplication } from "@nestjs/common";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "./create-user";
import { compare } from "bcryptjs";


describe("Create User Use Case", () => {

    let app: INestApplication
    let usersRepository: InMemoryUsersRepository
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
        createUserUseCase = new CreateUserUseCase(usersRepository)
    })

    it("Shoud be able to create a new user", async () => {
        const mockUser = {
            id: "tester01",
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
        }
        const { user } = await createUserUseCase.execute(mockUser)

        expect(user).toEqual(expect.any(Object));
        expect(user.id).toEqual(expect.any(String))
        expect(user).toHaveProperty("role")


    })

    it("should not be able to create two users with same email", async () => {
        await createUserUseCase.execute({
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
        })

        await expect(() =>
            createUserUseCase.execute({
                firstName: "test",
                lastName: "boy",
                email: "tester@test.com",
                password: "123123123",
                image: "",
                phone: "54999999999",
                adress: "Mock Street",
                cep: "00000000",
            })
        ).rejects.toBeInstanceOf(ConflictException)
    })

    it("Shoud be able to hash a password", async () => {
        const mockUser = {
            id: "tester01",
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
        }
        const { user } = await createUserUseCase.execute(mockUser)

        const isPasswordCorrectlyHashed = await compare("123123123", user.password)

        expect(isPasswordCorrectlyHashed).toBeTruthy()
    })
})