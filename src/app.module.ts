import { Module } from "@nestjs/common"
import { CreateAccountController } from "./controllers/user/create-account.controller"
import { PrismaService } from "./prisma/prisma.service"
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./env";
import { AuthModule } from "./auth/auth.module";
import { AuthenticateController } from "@/controllers/user/authenticate.controller";
import { EditUserController } from "./controllers/user/edit-user.controller";

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  }), AuthModule],
  controllers: [CreateAccountController, AuthenticateController, EditUserController],
  providers: [PrismaService],
})
export class AppModule { }
