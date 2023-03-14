import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailtemplateModule } from './emailtemplate/emailtemplate.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ItemModule } from './item/item.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [EmailtemplateModule, PrismaModule, ConfigModule.forRoot(), ItemModule, BrandModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
