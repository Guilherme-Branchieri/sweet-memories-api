import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users.repository";
import { CreateUserUseCase } from "../create";
import { PrismaService } from "@/prisma/prisma.service";

export function MakeCreateUserUseCase() {
    const usersRepository = new PrismaUsersRepository(new PrismaService)
    const createUserUseCase = new CreateUserUseCase(usersRepository)

    return createUserUseCase
}