import { OrderRepository } from "../repositories/order.repository"


export class CancelOrderUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }
    async execute(orderId: string): Promise<void> {
        await this.orderRepository.cancel(orderId)
    }
}