import { Controller, Post, HttpCode, Body, UseGuards } from "@nestjs/common";
import { z } from "zod"
import { ZodValidationPipe } from "@/common/pipes/zod-validation-pipe";
import { CreateProductDto } from "../dtos/create.product.dto";
import { MakeCreateProductUseCase } from "../use-cases/factories/make-create-product-use-case";
// import { CurrentUser } from "@/common/decorators/current-user-decorator";
// import { UserPayload } from "@/modules/auth/jwt-strategy";

import { Roles } from "@/common/decorators/roles.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";

const CreateProductBodySchema = z.object({
    id: z.string().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    images: z.array(z.string()),
    available: z.boolean().default(true),
    category: z.string(),
})

type CreateProductBodySchema = z.infer<typeof CreateProductBodySchema>

@Controller("/products")
export class CreateProductController {
    @Post("/create")
    @HttpCode(201)
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("ADMIN")
    async handle(@Body(new ZodValidationPipe(CreateProductBodySchema)) body: CreateProductDto) {
        const { id, name, price, description, images, available, category } = CreateProductBodySchema.parse(body);
        const createProductUseCase = MakeCreateProductUseCase()
        await createProductUseCase.execute({
            id: id ?? id,
            name,
            price,
            description,
            images,
            available,
            category,
        })

    }
}