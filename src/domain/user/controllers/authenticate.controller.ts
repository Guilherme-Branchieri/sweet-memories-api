import { Controller, Post, Body, UnauthorizedException, HttpCode } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "src/prisma/prisma.service"
import { z } from "zod"
import { compare } from "bcryptjs"
import { AuthenticateUserDto } from "../dtos/authenticate-user.dto"
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe"

const AuthenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof AuthenticateBodySchema>

@Controller("/sessions")
export class AuthenticateController {
    constructor(private jwt: JwtService, private prisma: PrismaService) { }

    @Post()
    @HttpCode(200)
    async handle(@Body(new ZodValidationPipe(AuthenticateBodySchema)) body: AuthenticateUserDto) {
        const { email, password } = body

        const user = await this.prisma.user.findUnique({ where: { email } })
        if (!user) {
            throw new UnauthorizedException("Invalid user credentials")
        }

        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid user credentials")
        }
        const accessToken = this.jwt.sign({ sub: user.id })

        return { access_token: accessToken }
    }
}
