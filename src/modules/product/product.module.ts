import { Module } from "@nestjs/common"
import { CreateProductController } from "./controllers/create.product.controller"
import { AuthService } from "../auth/auth.service"
import { FindAllProductController } from "./controllers/find-all.product.controller"
import { FindAllProductByCategoryController } from "./controllers/find-all-by-category.product.controller"
import { EditProductController } from "./controllers/edit.product.controller"
import { DeleteProductController } from "./controllers/delete.product.controller"
import { AuthModule } from "../auth/auth.module"

@Module({
    imports: [AuthModule],
    controllers: [
        CreateProductController,
        FindAllProductController,
        FindAllProductByCategoryController,
        EditProductController,
        DeleteProductController],
    providers: [AuthService],
})
export class ProductModule { }