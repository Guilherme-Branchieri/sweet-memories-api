/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, HttpCode, Body, UsePipes, UseGuards, Param, ValidationPipe, NotFoundException, } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod"
import { JwtAuthGuard } from "@/auth/jwt-auth.guard";


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

    @Post("/edit/:id")
    @HttpCode(204)
    @UsePipes(
        new ValidationPipe({
            transform: true,
            skipMissingProperties: true,
            whitelist: true
        }))
    async handle(@Param("id") id: string, @Body() body: EditUserBodySchema) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        })

        if (!user) {
            throw new NotFoundException("Credencials don't match")
        }

        const newUser = {
            firstName: body.firstName ?? body.firstName,
            lastName: body.lastName ?? body.lastName,
            image: body.image ?? body.lastName,
            phone: body.phone ?? body.phone,
            adress: body.adress ?? body.adress,
            cep: body.adress ?? body.adress
        }

        await this.prisma.user.update({
            data: newUser,
            where: { id },
        })
    }
}
