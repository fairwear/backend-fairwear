import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
