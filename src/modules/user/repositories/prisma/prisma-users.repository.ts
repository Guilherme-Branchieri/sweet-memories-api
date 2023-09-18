import { PrismaService } from "@/prisma/prisma.service";
import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users.repository";

export class PrismaUsersRepository implements UsersRepository {
    constructor(private prisma: PrismaService) { }

    async findById(id: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return user;
    }
    async findByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.prisma.user.create({
            data,
        });
        return user;
    }

    async editUser(data: Prisma.UserUncheckedCreateInput): Promise<void> {
        await this.prisma.user.update({
            data,
            where: {
                id: data.id
            }
        })
    }
}
