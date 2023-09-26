import { Module } from "@nestjs/common"
import { AuthenticateController } from "../user/controllers/authenticate.controller"
import { EditController } from "./controllers/edit.controller"
import { CreateAccountController } from "./controllers/create-account.controller"
import { AuthService } from "../auth/auth.service"

@Module({
    imports: [],
    controllers: [AuthenticateController, EditController, CreateAccountController],
    providers: [ AuthService],
})
export class UserModule { }