import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailtemplateModule } from './emailtemplate/emailtemplate.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TopicModule } from './topic/topic.module';

@Module({
  imports: [EmailtemplateModule, PrismaModule, ConfigModule.forRoot(), TopicModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
