import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { applyDecorators, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiConflictResponse, ApiNotFoundResponse, ApiUnauthorizedResponse, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true,
    transform: true,
  }));

  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Nest E Commerce')
  .setDescription('')
  .setVersion('1.0')
  .addTag('main')
  .build();
  const document = SwaggerModule.createDocument(app, config, {
    autoTagControllers: true,
    include: [],
  });
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
    });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

export function CommonApiResponses() {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiNotFoundResponse({ description: 'Not Found' }),
    ApiConflictResponse({ description: 'Conflict' }),
  );
}