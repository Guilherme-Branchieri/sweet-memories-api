/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, Post, HttpCode, Body, ConflictException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { hash } from "bcryptjs"

@Controller("/accounts/")
export class CreateAccountController {
    constructor(private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    async handle(@Body() body: any) {
        const { firstName, lastName, email, password, image, phone, adress, cep } = body;
        const emailAlreadyRegistered = await this.prisma.user.findUnique({
            where: {
                email
            }
        })

        if (emailAlreadyRegistered) {
            throw new ConflictException("Email already registered")
        }

        const passwodHash = await hash(password, 8)
        await this.prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: passwodHash,
                image,
                phone,
                adress,
                cep,
                role: ""
            }
        })
    }
}