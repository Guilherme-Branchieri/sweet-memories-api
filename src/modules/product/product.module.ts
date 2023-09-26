import { Module } from "@nestjs/common"
import { CreateProductController } from "./controllers/create.product.controller"
import { AuthService } from "../auth/auth.service"
import { FindAllProductController } from "./controllers/find-all.product.controller"
import { FindAllProductByCategoryController } from "./controllers/find-all-by-category.product.controller"

@Module({
    imports: [],
    controllers: [CreateProductController, FindAllProductController, FindAllProductByCategoryController],
    providers: [AuthService],
})
export class ProductModule { }