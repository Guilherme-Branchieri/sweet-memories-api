import { Order, Prisma } from "@prisma/client"



export type OrderRepository = {
    create(order: Order): Promise<Order | null>
    updateQuantity(orderId: string, quantity: number): Promise<void>
    findById(orderId: string): Promise<Order | null>
    findAllByUserId(userId: string): Promise<Order[]>
    edit(data: Prisma.OrderUncheckedCreateInput): Promise<void>
    cancel(orderId: string): Promise<void>

}