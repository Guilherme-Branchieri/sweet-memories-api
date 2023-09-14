/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, HttpCode, Body, UsePipes, UseGuards, Param, ValidationPipe, NotFoundException, } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod"
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";
import { CurrentUser } from "@/auth/current-user-decorator";
import { UserPayload } from "@/auth/jwt-strategy";
import { ZodValidationPipe } from "@/pipes/zod-validation-pipe";


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
@UseGuards(JwtAuthGuard)
export class EditUserController {
    constructor(private prisma: PrismaService) {
    }

    @Post("/edit")
    @HttpCode(204)
    async handle(@CurrentUser() userPayload: UserPayload, @Body(new ZodValidationPipe(EditUserBodySchema)) body: EditUserBodySchema) {

        const user = await this.prisma.user.findUnique({
            where: {
                id: userPayload.sub
            }
        })
        if (!user) {
            throw new NotFoundException("Credencials don't match")
        }

        const newUser = {
            ...user,
            ...body,
            updatedAt: new Date()
            
        }
        console.log(newUser)

        return await this.prisma.user.update({
            data: newUser,
            where: { id: userPayload.sub },
        })
    }
}
