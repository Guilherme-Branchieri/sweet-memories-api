import { Module } from "@nestjs/common"
import { PrismaService } from "./prisma/prisma.service"
import { ConfigModule } from "@nestjs/config";
import { envSchema } from "./config/env.config";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthService } from "./modules/auth/auth.service";
import { UserModule } from "./modules/user/user.module";
import { ProductModule } from "./modules/product/product.module";

@Module({
  imports: [ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  }), AuthModule, UserModule, ProductModule],
  controllers: [],
  providers: [PrismaService, AuthService],
})
export class AppModule { }
