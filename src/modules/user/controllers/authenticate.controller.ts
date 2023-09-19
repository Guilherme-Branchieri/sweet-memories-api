import { Controller, Post, Body, HttpCode } from "@nestjs/common"
import { z } from "zod"
import { AuthenticateUserDto } from "../dtos/authenticate-user.dto"
import { ZodValidationPipe } from "@/common/pipes/zod-validation-pipe"
import { MakeAuthenticateUseCase } from "../use-cases/factories/make-authenticate-use-case"
import { ConfigService } from "@nestjs/config"
import { Env } from "@/config/env.config"

const AuthenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

type AuthenticateBodySchema = z.infer<typeof AuthenticateBodySchema>

@Controller("/sessions")
export class AuthenticateController {
    constructor(private config: ConfigService<Env, true>) { }
    @Post()
    @HttpCode(200)
    async handle(@Body(new ZodValidationPipe(AuthenticateBodySchema)) body: AuthenticateUserDto) {
        const { email, password } = body

        const authenticateUseCase = MakeAuthenticateUseCase(this.config)

        const { token } = await authenticateUseCase.execute({
            email,
            password
        })

        return {access_token: token}

    }
}
