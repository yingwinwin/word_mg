import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 去掉多余字段
      forbidNonWhitelisted: true, // 多传字段直接报错
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
