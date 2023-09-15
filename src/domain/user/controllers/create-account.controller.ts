import { Controller, Post, HttpCode, Body, UsePipes } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { z } from "zod"
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { MakeCreateUserUseCase } from "../use-cases/factories/make-create-user-use-case";

const CreateAccountBodySchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    image: z.string(),
    phone: z.string().min(11).max(11),
    adress: z.string(),
    cep: z.string()

})

type CreateAccountBodySchema = z.infer<typeof CreateAccountBodySchema>

@Controller("/accounts")
export class CreateAccountController {
    constructor(private prisma: PrismaService) { }

    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(CreateAccountBodySchema))
    async handle(@Body() body: CreateAccountBodySchema) {

        const { firstName, lastName, email, password, image, phone, adress, cep } = CreateAccountBodySchema.parse(body);

        const createUserUseCase = MakeCreateUserUseCase()

        await createUserUseCase.execute({
            firstName,
            lastName,
            email,
            password,
            image,
            phone,
            adress,
            cep
        })

    }
}