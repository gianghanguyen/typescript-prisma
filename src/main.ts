import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { GlobalExceptionsFilter } from './common/exception/global-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionsFilter());
  app.enableCors(); //  access-control-allow-origin: *

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.use((helmet as any)());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .addBearerAuth() // Authorization header
    .setTitle('API document')
    .setDescription('The API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
