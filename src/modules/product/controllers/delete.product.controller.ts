import { Controller, Post, HttpCode, Body, UseGuards } from "@nestjs/common";
import { z } from "zod"
import { ZodValidationPipe } from "@/common/pipes/zod-validation-pipe";
import { Roles } from "@/common/decorators/roles.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";
import { DeleteProductDto } from "../dtos/delete.product.dto";
import { MakeDeleteProductUseCase } from "../use-cases/factories/make-delete-product-use-case";

const DeleteProductBodySchema = z.object({
    id: z.string(),
})

type DeleteProductBodySchema = z.infer<typeof DeleteProductBodySchema>

@Controller("/products")
export class DeleteProductController {
    @Post("/delete")
    @HttpCode(204)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async handle(@Body(new ZodValidationPipe(DeleteProductBodySchema)) body: DeleteProductDto) {
        const { id } = DeleteProductBodySchema.parse(body);
        const deleteProductUseCase = MakeDeleteProductUseCase()
        await deleteProductUseCase.execute(id)
    }
}