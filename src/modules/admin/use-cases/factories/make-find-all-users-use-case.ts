import { PrismaUsersRepository } from "@/modules/user/repositories/prisma/prisma-users.repository";
import { PrismaService } from "@/prisma/prisma.service";
import { PrismaAdminRepository } from "../../repositories/prisma/prisma-admin.repository";
import { FindAllUserUseCase } from "../find-all-users.admin";

export function MakeFindAllUserUseCase() {
    const usersRepository = new PrismaUsersRepository(new PrismaService)
    const adminRepository = new PrismaAdminRepository(new PrismaService, usersRepository)
    const findAllUserUseCase = new FindAllUserUseCase(adminRepository)

    return findAllUserUseCase
}