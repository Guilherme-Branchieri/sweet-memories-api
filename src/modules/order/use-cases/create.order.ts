import { ORDER_STATUS, Order } from "@prisma/client"
import { OrderRepository } from "../repositories/order.repository"


type CreateOrderUseCaseRequest = {
    id: string
    value: number
    createdAt: Date
    updatedAt: Date | null
    userId: string
    quantity: number
    productId: string
    status: ORDER_STATUS

}

type CreateOrderUseCaseResponse = {
    order: Order
}

export class CreateOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }
    async execute(order: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
        await this.orderRepository.create(order)
        return { order }
    }
}