import { Order } from ".prisma/client"
import { OrderRepository } from "../repositories/order.repository"

export class FindAllByUserIdUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }
    async execute(userId: string): Promise<Order[]> {
        const orders = await this.orderRepository.findAllByUserId(userId)
        return orders
    }
}