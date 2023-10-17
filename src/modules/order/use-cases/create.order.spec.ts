import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing/test";
import { InMemoryOrderRepository } from "../repositories/in-memory/in-memory-order.repository";
import { CreateOrderUseCase } from "./create.order";


describe("Create Order Use Case", () => {

    let app: INestApplication
    let orderRepository: InMemoryOrderRepository
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
        createOrderUseCase = new CreateOrderUseCase(orderRepository)
    })

    it("Shoud be able to create a new order", async () => {
        const {order} = await createOrderUseCase.execute({
            id: "order-01",
            value: 350,
            createdAt: new Date(),
            updatedAt: null,
            userId: "user-01",
            quantity: 2,
            productId: "product-01",
            status: "PROCESSING"
        })

        expect(order).toMatchObject({
            id: "order-01",
            value: 350,
            createdAt: expect.any(Date),
            updatedAt: null,
            userId: "user-01",
            quantity: 2,
            productId: "product-01",
            status: "PROCESSING"
        })

    })

})