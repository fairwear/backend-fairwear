import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/AllExceptionsFilter';
import { PrismaClientExceptionFilter } from './exception/PrismaExceptionFilter';
import { LoggerService } from 'Logger/logger.service';
import { MyLogger } from 'Logger/mylogger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new MyLogger() });

  dotenv.config({ path: '.env' });

  const config = new DocumentBuilder()
    .setTitle('Fairwear Backend')
    .setDescription(
      'The Fairwear Backend, used by the Fairwear app to manage users, items, brands, etc.',
    )
    .setVersion('1.0')
    .addTag('FairWear')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const httpAdapterHost = app.get(HttpAdapterHost);
  const httpAdapter = httpAdapterHost.httpAdapter;

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new PrismaClientExceptionFilter(httpAdapter),
  );

  await LoggerService.start();
  app.useLogger(new MyLogger());

  await app.listen(8080);
}
bootstrap();
