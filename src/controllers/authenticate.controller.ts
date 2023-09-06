import { Controller, Post } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Controller("/auth")
export class AuthenticateController {
    constructor(private jwt: JwtService) { }

    @Post("/login")
    async handle() {
        const token = this.jwt.sign({
            sub: "user-id"
            //Todo: get user id
        })
        return token
    }


}
