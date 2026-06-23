import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Event Check-in API')
  .setDescription('Technical Test API')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(
  app,
  config,
);

SwaggerModule.setup(
  'api',
  app,
  document,
);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
