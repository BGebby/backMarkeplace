import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './errorException/global-exception.filter';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  // Habilita CORS
  app.enableCors({
    origin: [configService.get<string>('CORS_ORIGIN') || 'http://localhost:5173'],
    credentials: true,
  });

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/', 
  });
  // Manejo de excepciones globales
  app.useGlobalFilters(new GlobalExceptionFilter());


  await app.listen(3000);
}
bootstrap();
