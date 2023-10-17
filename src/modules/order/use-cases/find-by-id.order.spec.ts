import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing/test";
import { InMemoryOrderRepository } from "../repositories/in-memory/in-memory-order.repository";
import { CreateOrderUseCase } from "./create.order";
import { FindByIdUseCase } from "./find-by-id.order";


describe("Find By Id Order Use Case", () => {

    let app: INestApplication
    let orderRepository: InMemoryOrderRepository
    let createOrderUseCase: CreateOrderUseCase
    let findById: FindByIdUseCase

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
        findById = new FindByIdUseCase(orderRepository)
    })

    it("Shoud be able to retrieve order data given orderId", async () => {
        await createOrderUseCase.execute({
            id: "order-01",
            value: 350,
            createdAt: new Date(),
            updatedAt: null,
            userId: "user-01",
            quantity: 35,
            productId: "product-01",
            status: "PROCESSING"
        })
        const order = await findById.execute("order-01")
        console.log(order)

        expect(order).toBeTruthy()
        expect(order?.id).toStrictEqual("order-01")
    })

})