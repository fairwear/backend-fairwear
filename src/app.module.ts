import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailtemplateModule } from './emailtemplate/emailtemplate.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    EmailtemplateModule,
    PrismaModule,
    ConfigModule.forRoot(),
    UserRoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
