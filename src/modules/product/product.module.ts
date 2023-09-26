import { Module } from "@nestjs/common"
import { CreateProductController } from "./controllers/create.product.controller"
import { AuthService } from "../auth/auth.service"
import { FindAllProductController } from "./controllers/find-all.product.controller"

@Module({
    imports: [],
    controllers: [CreateProductController, FindAllProductController],
    providers: [AuthService],
})
export class ProductModule { }