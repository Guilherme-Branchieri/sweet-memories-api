import { Module } from "@nestjs/common"
import { CreateAccountController } from "@/modules/user/controllers/create-account.controller";
import { PrismaService } from "./prisma/prisma.service"
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./config/env.config";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthenticateController } from "@/modules/user/controllers/authenticate.controller";
import { EditUserController } from "@/modules/user/controllers/edit-user.controller";

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  }), AuthModule],
  controllers: [CreateAccountController, AuthenticateController, EditUserController],
  providers: [PrismaService],
})
export class AppModule { }
