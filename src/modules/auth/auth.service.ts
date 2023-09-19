import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }
  // Other methods of AuthService

  generateJwtToken(user: User): string {
    return this.jwtService.sign({sub: user.id, role: user.role});
  }
}

                                                                                                
// import { Injectable } from "@nestjs/common";
// import { JwtService } from "@nestjs/jwt";
// import { User } from "@prisma/client";

// @Injectable()
// export class AuthService {
//     constructor(private readonly jwtService: JwtService) { }
//     generateJwtToken(user: User): string {
//         const payload = { sub: user.id};
//         console.log(this.jwtService)
//         const token = this.jwtService.sign(payload);
//         return token;
//       }
// }