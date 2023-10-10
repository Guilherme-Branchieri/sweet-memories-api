import { InMemoryUsersRepository } from "@/modules/user/repositories/in-memory/in-memory-users.repository";
import { Order } from "@prisma/client";
import { AdminRepository } from "../admin.repository";
import { UserEntity } from "@/modules/user/entities/user.entity";

export class InMemoryAdminRepository implements AdminRepository {
    constructor(private usersRepository: InMemoryUsersRepository) {
        this.usersRepository = usersRepository
    }
    public orders: Order[] = []

    async findAllOrders(): Promise<{ id: string; value: number; createdAt: Date; updatedAt: Date | null; userId: string; }[] | null> {
        return this.orders
    }
    async findAllUsers(): Promise<UserEntity[]>{
        return this.usersRepository.users
    }
    async deleteUser(id: string): Promise<void> {
        const userIndex = await this.usersRepository.users.findIndex((user) => user.id === id)
        await this.usersRepository.users.splice(userIndex, 1)
    }

}