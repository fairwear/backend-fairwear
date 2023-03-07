import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserRoleModule } from './user-role/user-role.module';

@Module({
  imports: [PrismaModule, ConfigModule.forRoot(), UserRoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
