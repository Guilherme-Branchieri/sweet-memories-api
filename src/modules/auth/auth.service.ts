
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

type GenerateJwtTokenReturn = {
  accessToken: string,
  refreshToken: string
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }
  // Other methods of AuthService

  generateJwtToken(user: User): GenerateJwtTokenReturn {
    const accessToken = this.jwtService.sign({
      sub: user.id, role: user.role,
    }, {
      expiresIn: "3d"
    })
    const refreshToken = this.jwtService.sign({
      sub: user.id, role: user.role,
    }, {
      expiresIn: "7d"
    })

    return { refreshToken, accessToken }
  }
}