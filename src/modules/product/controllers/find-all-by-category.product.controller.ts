import { Controller, HttpCode, Get, Param, Query } from "@nestjs/common";
import { MakeFindAllProductByCategoryUseCase } from "../use-cases/factories/make-find-all-by-category-use-case";


@Controller("/products/list")
export class FindAllProductByCategoryController {
    @Get("/specify")
    @HttpCode(200)
    async handle(@Param("category") category: string, @Query("page") page?: number) {
        const findAllProductByCategoryUseCase = MakeFindAllProductByCategoryUseCase()
        const products = await findAllProductByCategoryUseCase.execute({category, page})
        return products
    }
}