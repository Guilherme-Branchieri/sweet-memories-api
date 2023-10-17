/* eslint-disable @typescript-eslint/no-unused-vars */
import { Order, Prisma } from "@prisma/client";
import { OrderRepository } from "../order.repository";
import { PrismaService } from "@/prisma/prisma.service";

export class PrismaOrderRepository implements OrderRepository {
    constructor(private readonly prisma: PrismaService) { }
    async create(order): Promise<Order | null> {
        return await this.prisma.order.create(order)
    }

    async updateQuantity(orderId: string, quantity: number): Promise<void> {
        await this.prisma.order.update({
            data: {
                quantity
            },
            where: {
                id: orderId
            }
        })
    }

    async findById(orderId: string) {
        return await this.prisma.order.findUnique({
            where: {
                id: orderId
            }
        })
    }
    async findAllByUserId(userId: string) {
        return this.prisma.order.findMany({
            where: {
                userId
            }
        })

    }
    async edit(data: Prisma.OrderUncheckedCreateInput): Promise<void> {
        await this.prisma.order.update({
            data: {
                ...data
            },
            where: {
                id: data.id
            },
            
        })
    }

    async cancel(orderId: string): Promise<void> {
        await this.prisma.order.update({
            data: {
                status: "CANCELLED"
            },
            where: {
                id: orderId
            }
        })
    }

}