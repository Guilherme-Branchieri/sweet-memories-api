import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing/test";
import { InMemoryOrderRepository } from "../repositories/in-memory/in-memory-order.repository";
import { CreateOrderUseCase } from "./create.order";
import { FindAllByUserIdUseCase } from "./find-all-by-user-id.order";
import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users.repository";
import { CreateUserUseCase } from "@/modules/user/use-cases/create.user";
import { Order } from "@prisma/client";


describe("Find All Order By User Use Case", () => {

    let app: INestApplication
    let orderRepository: InMemoryOrderRepository
    let userRepository: InMemoryUsersRepository
    let createUserUseCase: CreateUserUseCase
    let findAllByUserId: FindAllByUserIdUseCase
    let createOrderUseCase: CreateOrderUseCase

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [AppModule],
        })
            .compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    beforeEach(async () => {
        orderRepository = new InMemoryOrderRepository()
        userRepository = new InMemoryUsersRepository()
        createUserUseCase = new CreateUserUseCase(userRepository)
        createOrderUseCase = new CreateOrderUseCase(orderRepository)
        findAllByUserId = new FindAllByUserIdUseCase(orderRepository)

    })

    it("Shoud be able to fetch all orders from an user given userId", async () => {
        const { user } = await createUserUseCase.execute({
            id: "user-01",
            firstName: "test",
            lastName: "boy",
            email: "tester@test.com",
            password: "123123123",
            image: "",
            phone: "54999999999",
            adress: "Mock Street",
            cep: "00000000",
        })
        console.log("userrr: " + user)
        for (let i = 0; i < 21; i++) {
            await createOrderUseCase.execute({
                id: `order-${i}`,
                value: 350,
                createdAt: new Date(),
                updatedAt: null,
                userId: "user-01",
                quantity: 2,
                productId: `product-${i}`,
                status: "PROCESSING"
            })

        }

        const orders = await findAllByUserId.execute("user-01")
        console.log(orders)

        expect(orders).toBeInstanceOf(Array<Order>)
        expect(orders[0]).toMatchObject({
            id: "order-0",
            value: 350,
            createdAt: expect.any(Date),
            updatedAt: null,
            userId: "user-01",
            quantity: 2,
            productId: "product-0",
            status: "PROCESSING"

        })
    })

})