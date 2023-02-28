import { Module } from '@nestjs/common';
import { EmailtemplateService } from './emailtemplate.service';
import { EmailtemplateController } from './emailtemplate.controller';

@Module({
  controllers: [EmailtemplateController],
  providers: [EmailtemplateService],
})
export class EmailtemplateModule {}
