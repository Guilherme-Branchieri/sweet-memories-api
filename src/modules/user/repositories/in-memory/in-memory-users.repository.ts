import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users.repository";
import { randomUUID } from "crypto";

export class InMemoryUsersRepository implements UsersRepository {
    public users: User[] = []

    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = {
            id: data.id ?? randomUUID(),
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            image: data.image ?? "",
            phone: data.phone,
            adress: data.adress,
            cep: data.cep,
            role: data.role ?? "COMMON",
            createdAt: new Date(),
            updatedAt: null
        }
        await this.users.push(user)

        return user
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.users.find((user) => user.email === email)
        if (!user) {
            return null
        }
        return user
    }
    async findById(id: string): Promise<User | null> {
        const user = await this.users.find((user) => user.id === id)
        if (!user) {
            return null
        }
        return user
    }
    async edit(updatedUser: User): Promise<void> {
        const index = this.users.findIndex((user) => user.id === updatedUser.id);
        if (index !== -1) {
            this.users[index] = updatedUser;
        }

    }
}