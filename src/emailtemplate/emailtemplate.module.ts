import { Module } from '@nestjs/common';
import { EmailTemplateService } from './emailtemplate.service';
import { EmailtemplateController } from './emailtemplate.controller';

@Module({
  controllers: [EmailtemplateController],
  providers: [EmailTemplateService],
})
export class EmailtemplateModule {}
