import { Controller, Post, HttpCode, Body, UsePipes } from "@nestjs/common";
import { z } from "zod"
import { ZodValidationPipe } from "@/common/pipes/zod-validation-pipe";
import { MakeCreateUserUseCase } from "../use-cases/factories/make-create-user-use-case";
import { CreateUserDto } from "../dtos/create.dto";

const CreateAccountBodySchema = z.object({
    id: z.string().optional(),
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
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(CreateAccountBodySchema))
    async handle(@Body() body: CreateUserDto) {

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