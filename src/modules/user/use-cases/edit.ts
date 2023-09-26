import { UsersRepository } from "../repositories/users.repository";
import { NotFoundException } from "@nestjs/common";

type EditUseCaseRequest = {
    data: {
        id: string
        firstName?: string
        lastName?: string
        email?: string
        password?: string
        image?: string
        phone?: string
        adress?: string
        cep?: string
    }
}



export class EditUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        data
    }: EditUseCaseRequest): Promise<void> {

        const user = await this.usersRepository.findById(data.id)

        if (!user) {
            throw new NotFoundException("User not found")
        }

        const updatedUser = {
            ...user,
            ...data
            ,
            updatedAt: new Date()

        }

        await this.usersRepository.edit(updatedUser)
    }
}