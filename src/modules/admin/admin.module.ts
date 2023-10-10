import { Module } from "@nestjs/common"
import { AuthService } from "../auth/auth.service"
import { FindAllUserController } from "./controllers/find-all-users.admin.controller"
import { AuthModule } from "../auth/auth.module"
import { UserModule } from "../user/user.module"

@Module({
    imports: [AuthModule, UserModule],
    controllers: [FindAllUserController],
    providers: [AuthService],
})
export class AdminModule { }