import { UsersRepository } from "../repositories/users.repository";
import { UnauthorizedException } from "@nestjs/common";
import { compare } from "bcryptjs";
import { AuthService } from "@/modules/auth/auth.service";

type AuthenticateUseCaseRequest = {
    email: string
    password: string
}

type AuthenticateUseCaseResponse = {
    token: string
}



export class AuthenticateUseCase {
    constructor(private usersRepository: UsersRepository, private jwtService: AuthService) { }

    async execute({
        email,
        password,
    }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {

        const user = await this.usersRepository.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException("Invalid user credentials")
        }

        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid user credentials")
        }

        const token = this.jwtService.generateJwtToken(user)
        return { token }

    }
}