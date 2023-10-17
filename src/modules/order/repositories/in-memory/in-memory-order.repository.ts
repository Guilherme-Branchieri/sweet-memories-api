/* eslint-disable @typescript-eslint/no-unused-vars */
import { $Enums, Order } from "@prisma/client";
import { OrderRepository } from "../order.repository";

export class InMemoryOrderRepository implements OrderRepository {
    public orders: Order[] = []

    async create(order: { id: string; value: number; createdAt: Date; updatedAt: Date | null; userId: string; quantity: number; status: $Enums.ORDER_STATUS | null; productId: string; }) {
        await this.orders.push(order)
        return order

    }
    async updateQuantity(orderId: string, quantity: number): Promise<void> {
        const indexToUpdate = await this.orders.findIndex((order) => order.id === orderId)
        this.orders[indexToUpdate].quantity = quantity
    }
    async findById(orderId: string) {
        const order = this.orders.find((order) => order.id === orderId)
        if (!order) {
            return null
        }
        return order
    }
    async findAllByUserId(userId: string) {
        const allUserOrders = await this.orders.filter((order) => order.userId === userId)
        return allUserOrders
    }
    async edit(data: { id: string; value: number; createdAt: Date; updatedAt: Date | null; userId: string; quantity: number; status: $Enums.ORDER_STATUS | null; productId: string; }) {
        const indexToUpdate = await this.orders.findIndex((order) => order.id === data.id)
        this.orders[indexToUpdate] = data
    }
    async cancel(orderId: string): Promise<void> {
        const indexToCancel = this.orders.findIndex((order) => order.id === orderId)
        this.orders[indexToCancel].status = "CANCELLED"
    }




}