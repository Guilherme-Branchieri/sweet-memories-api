import { AppModule } from "@/app.module";
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing/test";
import { InMemoryOrderRepository } from "../repositories/in-memory/in-memory-order.repository";
import { UpdateQuantityUseCase } from "./update-quantity.order";
import { CreateOrderUseCase } from "./create.order";
import { FindByIdUseCase } from "./find-by-id.order";


describe("Update Quantity Use Case", () => {

    let app: INestApplication
    let orderRepository: InMemoryOrderRepository
    let updateQuantityUseCase: UpdateQuantityUseCase
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
        updateQuantityUseCase = new UpdateQuantityUseCase(orderRepository)
        createOrderUseCase = new CreateOrderUseCase(orderRepository)
        findById = new FindByIdUseCase(orderRepository)
    })

    it("Shoud be able to update quantity from an order given orderId", async () => {
        const createOrder = await createOrderUseCase.execute({
            id: "order-01",
            value: 350,
            createdAt: new Date(),
            updatedAt: null,
            userId: "user-01",
            quantity: 2,
            productId: "product-01",
            status: "PROCESSING"
        })

        expect(createOrder.order.quantity).toStrictEqual(2)

        await updateQuantityUseCase.execute({
            orderId: "order-01",
            quantity: 18
        })

        const order = await findById.execute("order-01")
        console.log(order)

        expect(order?.quantity).toStrictEqual(18)
    })

})