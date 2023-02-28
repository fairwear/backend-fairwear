import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailtemplateModule } from './emailtemplate/emailtemplate.module';

@Module({
  imports: [EmailtemplateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
