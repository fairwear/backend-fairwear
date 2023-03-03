import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ReportModule } from './report/report.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
