import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ConfigService } from "@nestjs/config"
import { Env } from "./env"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService: ConfigService<Env, true> = app.get(ConfigService)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const port = configService.get("PORT", { infer: true })

  const docs = new DocumentBuilder()
    .setTitle("Sweet Memories")
    .setDescription("TODO")
    .setVersion("1.0")
    .addTag("api")
    .build();
  const document = SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup("api", app, document);


  await app.listen(port)
}
bootstrap()
