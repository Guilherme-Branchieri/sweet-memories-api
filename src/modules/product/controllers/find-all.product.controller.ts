import { Controller, HttpCode, Get } from "@nestjs/common";
import { MakeFindAllProductUseCase } from "../use-cases/factories/make-find-all-product-use-case";
// import { CurrentUser } from "@/common/decorators/current-user-decorator";
// import { UserPayload } from "@/modules/auth/jwt-strategy";


@Controller("/products")
export class FindAllProductController {
    @Get("/list")
    @HttpCode(200)
    async handle() {
        const findAllProductUseCase = MakeFindAllProductUseCase()
        const products = await findAllProductUseCase.execute()
        return products
    }
}