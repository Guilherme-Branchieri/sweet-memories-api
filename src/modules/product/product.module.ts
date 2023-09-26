import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { RolesGuard } from "@/common/guards/roles.guard"
import { CreateProductController } from "./controllers/create.controller"
import { AuthService } from "../auth/auth.service"

@Module({
    imports: [],
    controllers: [CreateProductController],
    providers: [AuthService],
})
export class ProductModule { }