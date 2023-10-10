import { Controller, HttpCode, Get, UseGuards } from "@nestjs/common";
import { MakeFindAllUserUseCase } from "../use-cases/factories/make-find-all-users-use-case";
import { Roles } from "@/common/decorators/roles.decorator";
import { JwtAuthGuard } from "@/common/guards/jwt-auth.guard";
import { RolesGuard } from "@/common/guards/roles.guard";



@Controller("/admin/users/list")
@UseGuards(JwtAuthGuard, RolesGuard)
export class FindAllUserController {
    @Get()
    @HttpCode(200)
    @Roles("ADMIN")
    async handle() {
        const findAllUserUseCase = MakeFindAllUserUseCase()
        const users = await findAllUserUseCase.execute()
        return users
    }
}