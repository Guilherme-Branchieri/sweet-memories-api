import { Test } from "@nestjs/testing";
import { AppModule } from "@/app.module";
import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "./create";
import { AuthenticateUseCase } from "./authenticate";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "@/modules/auth/auth.service";


describe("Authenticate Use Case", () => {

    let app: INestApplication
    let usersRepository: InMemoryUsersRepository
    let createUserUseCase: CreateUserUseCase
    let authenticateUseCase: AuthenticateUseCase
    let authService: AuthService

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
        authService = new AuthService(new JwtService({
            secret: "testing_secret"
        }))
        createUserUseCase = new CreateUserUseCase(usersRepository)
        authenticateUseCase = new AuthenticateUseCase(usersRepository, authService)
        await createUserUseCase.execute({
            id: "tester01",
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
        })
    })

    it("Shoud be able to authenticate an existing user", async () => {
        const { access_token, refresh_token } = await authenticateUseCase.execute({
            email: "tester@test.com",
            password: "123123123"
        })

        expect(access_token).toBeTruthy()
        expect(access_token).toEqual(expect.any(String))
        expect(refresh_token).toBeTruthy()
        expect(refresh_token).toEqual(expect.any(String))
    })

    it("Shoud not be able to authenticate given wrong password and email", async () => {
        await expect(() =>
            authenticateUseCase.execute({
                email: "test1user@example.com",
                password: "13123",
            })
        ).rejects.toBeInstanceOf(UnauthorizedException);
    })


})