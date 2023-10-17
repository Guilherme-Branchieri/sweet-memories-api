import { OrderRepository } from "../repositories/order.repository"


type UpdateQuantityUseCaseRequest = {
    orderId: string
    quantity: number

}


export class UpdateQuantityUseCase {
    constructor(private readonly orderRepository: OrderRepository) { }
    async execute({ orderId, quantity }: UpdateQuantityUseCaseRequest): Promise<void> {
        await this.orderRepository.updateQuantity(orderId, quantity)
    }
}