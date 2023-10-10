import { PrismaClient } from "@prisma/client";
import { AdminRepository } from "../admin.repository";
import { UsersRepository } from "@/modules/user/repositories/users.repository";
import { NotFoundException } from "@nestjs/common";
import { UserWithoutPasswordEntity } from "@/modules/user/entities/user-without-password.entity";

export class PrismaAdminRepository implements AdminRepository {
    constructor(private prisma: PrismaClient, private usersRepository: UsersRepository) {

    }
    async deleteUser(id: string): Promise<void> {
        const user = await this.usersRepository.findById(id)
        if (!user) {
            throw new NotFoundException("User doesn't exists")
        }

        await this.prisma.user.delete({
            where: {
                id
            }
        })

    }

    async findAllOrders(): Promise<{ id: string; value: number; createdAt: Date; updatedAt: Date | null; userId: string; }[] | null> {
        const orders = await this.prisma.order.findMany()
        return orders
    }

    async findAllUsers(): Promise<UserWithoutPasswordEntity[]> {
        return await this.prisma.user.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
                phone: true,
                adress: true,
                cep: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        
    }

}