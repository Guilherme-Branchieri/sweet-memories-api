import { JwtService } from "@nestjs/jwt";
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users.repository";
import { AuthenticateUseCase } from "../authenticate.user";
import { PrismaService } from "@/prisma/prisma.service";
import { AuthService } from "@/modules/auth/auth.service";
import { ConfigService } from "@nestjs/config";
import { Env } from "@/config/env.config";

export function MakeAuthenticateUseCase(config: ConfigService<Env, true>) {
    const privateKey = config.get("JWT_PRIVATE_KEY", { infer: true })
    const usersRepository = new PrismaUsersRepository(new PrismaService())
    const jwtService = new AuthService(new JwtService({
        secret: Buffer.from(privateKey, "base64"),
        signOptions: { algorithm: "RS256" }
    }))
    const authenticateUseCase = new AuthenticateUseCase(usersRepository, jwtService)

    return authenticateUseCase
}
