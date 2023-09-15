import { Prisma, ROLE, User } from "@prisma/client";
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
    async editUser(data: Prisma.UserUpdateInput): Promise<void> {
        const indexToUpdate = this.users.findIndex(user => user.id === data.id)
        if (indexToUpdate !== -1) {
            this.users[indexToUpdate].id = data.id as string;
            this.users[indexToUpdate].firstName = data.firstName as string
            this.users[indexToUpdate].lastName = data.lastName as string
            this.users[indexToUpdate].email = data.email as string
            this.users[indexToUpdate].password = data.password as string
            this.users[indexToUpdate].image = data.image as string
            this.users[indexToUpdate].phone = data.phone as string
            this.users[indexToUpdate].adress = data.adress as string
            this.users[indexToUpdate].cep = data.cep as string
            this.users[indexToUpdate].role = data.role as ROLE
            this.users[indexToUpdate].createdAt = data.createdAt as Date

        } else {
            throw new Error(`User with ID ${data.id} not found in the array.`);
        }
    }


}