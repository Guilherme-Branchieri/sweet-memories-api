import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { PrismaService } from "src/prisma/prisma.service"
import { z } from "zod"
import { compare } from "bcryptjs"

const AuthenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof AuthenticateBodySchema>

@Controller("/sessions")
export class AuthenticateController {
    constructor(private jwt: JwtService, private prisma: PrismaService) { }

    @Post()
    
    async handle(@Body() body: AuthenticateBodySchema) {
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
