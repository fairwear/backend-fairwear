import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  dotenv.config({ path: '.env' });

  const config = new DocumentBuilder()
    .setTitle('Fairwear API')
    .setDescription(
      'The Fairwear API, used by the Fairwear app to manage users, products, orders, etc.',
    )
    .setVersion('1.0')
    .addTag('FairWear')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
}
bootstrap();
