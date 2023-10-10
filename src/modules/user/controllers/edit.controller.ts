/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, HttpCode, Body, UseGuards, UnauthorizedException, } from "@nestjs/common";
import { z } from "zod"
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { CurrentUser } from "@/common/decorators/current-user.decorator";
import { UserPayload } from "@/modules/auth/jwt-strategy";
import { ZodValidationPipe } from "@/common/pipes/zod-validation-pipe";
import { EditUserDto } from "../dtos/edit.dto";
import { MakeEditUseCase } from "../use-cases/factories/make-edit-user-use-case";
import { RolesGuard } from "@/common/guards/roles.guard";
import { Roles } from "@/common/decorators/roles.decorator";
const EditUserBodySchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    image: z.string().optional(),
    phone: z.string().min(11).max(11).optional(),
    adress: z.string().optional(),
    cep: z.string().optional(),
})

type EditUserBodySchema = z.infer<typeof EditUserBodySchema>


@Controller("/accounts")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EditController {

    @Post("/edit")
    @HttpCode(204)
    @Roles("ADMIN", "COMMON")
    async handle(@CurrentUser() userPayload: UserPayload, @Body(new ZodValidationPipe(EditUserBodySchema)) body: EditUserDto) {
        if (!userPayload) {
            throw new UnauthorizedException("Invalid authorization credentials")
        }

        const editUseCase = MakeEditUseCase()
        const data = { id: userPayload.sub, ...EditUserBodySchema.parse(body) }
        return await editUseCase.execute({ data })

    }
}
