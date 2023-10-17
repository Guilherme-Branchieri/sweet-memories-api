import { Order } from "@prisma/client"
import { OrderRepository } from "../repositories/order.repository"

export class FindByIdUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }
    async execute(orderId: string): Promise<Order | null> {
        const order = await this.orderRepository.findById(orderId)
        return order
    }
}