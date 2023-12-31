import { ROLE, User } from "@prisma/client";
import { UsersRepository } from "../repositories/users.repository";
import { ConflictException } from "@nestjs/common";
import { hash } from "bcryptjs";

type CreateUserUseCaseRequest = {
    id?: string
    firstName: string
    lastName: string
    email: string
    password: string
    image?: string
    phone: string
    adress: string
    cep: string,
    role?: ROLE

}

type CreateUserUseCaseResponse = {
    user: User
}


export class CreateUserUseCase {
    constructor(private usersRepository: UsersRepository) { }

    async execute({
        id,
        firstName,
        lastName,
        email,
        password,
        image,
        phone,
        adress,   
        cep,
        role
    }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {

        const emailAlreadyRegistered = await this.usersRepository.findByEmail(email)

        if (emailAlreadyRegistered) {
            throw new ConflictException("Email already registered")
        }
        const passwodHash = await hash(password, 8)

        const user = await this.usersRepository.create({
            id: id?? id,
            firstName,
            lastName,
            email,
            password: passwodHash,
            image,
            phone,
            adress,
            cep,
            role
        })

        return {user}
    }
}