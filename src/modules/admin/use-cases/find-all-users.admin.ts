import { UserWithoutPasswordEntity } from "@/modules/user/entities/user-without-password.entity";
import { AdminRepository } from "../repositories/admin.repository";


export class FindAllUserUseCase {
    constructor(private adminRepository: AdminRepository) { }

    async execute(): Promise<UserWithoutPasswordEntity[]> {
        const users = await this.adminRepository.findAllUsers()
        return users
    }
}