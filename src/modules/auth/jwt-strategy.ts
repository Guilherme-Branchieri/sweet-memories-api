import { Env } from "@/config/env.config";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { z } from "zod";
import { ROLE } from "@prisma/client";


const tokenPayloadSchema = z.object({
    sub: z.string().uuid(),
    role: z.nativeEnum(ROLE)
})

export type UserPayload = z.infer<typeof tokenPayloadSchema>

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService<Env, true>) {
        const publicKey = config.get("JWT_PUBLIC_KEY", { infer: true })
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Buffer.from(publicKey, "base64"),
            algorithms: ["RS256"],
        });
    }

    async validate(payload: UserPayload) {
        return {
            sub: payload.sub,
            role: payload.role,
        }
    }

}