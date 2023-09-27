import { Roles } from "@/common/decorators/roles.decorator"
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard"
import { RolesGuard } from "@/common/guards/roles.guard"
import { ZodValidationPipe } from "@/common/pipes/zod-validation-pipe"
import { Controller, UseGuards, Post, HttpCode, Body, UnauthorizedException } from "@nestjs/common"
import { z } from "zod"
import { EditProductDto } from "../dtos/edit.product.dto"
import { MakeEditProductUseCase } from "../use-cases/factories/make-edit-product-use-case"
import { CurrentUser } from "@/common/decorators/current-user.decorator"
import { UserPayload } from "@/modules/auth/jwt-strategy"

const EditProductBodySchema = z.object({
    data: z.object({
        id: z.string().nonempty(),
        name: z.string().optional(),
        description: z.string().optional(),
        price: z.number().optional(),
        images: z.array(z.string()).optional(),
        available: z.boolean().optional(),
        category: z.string().optional(),
    })
})

type EditProductBodySchema = z.infer<typeof EditProductBodySchema>


@Controller("/products/edit")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EditProductController {
    @Post()
    @HttpCode(204)
    @Roles("ADMIN")
    async handle(@CurrentUser() userPayload: UserPayload, @Body(new ZodValidationPipe(EditProductBodySchema)) body: EditProductDto) {
        if (!userPayload) {
            throw new UnauthorizedException()
        }
        const { data } = EditProductBodySchema.parse(body)
        const editProductUseCase = MakeEditProductUseCase()
        return await editProductUseCase.execute({ data })

    }
}
