import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { EditUseCase } from "../edit.user";

export function MakeEditUseCase() {
    const usersRepository = new PrismaUsersRepository(new PrismaService)
    const editUseCase = new EditUseCase(usersRepository)

    return editUseCase
}