import { Module } from '@nestjs/common';
import { EmailTemplateService } from './emailtemplate.service';
import { EmailTemplateController } from './emailtemplate.controller';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService, PrismaService],
})
export class EmailtemplateModule {}
