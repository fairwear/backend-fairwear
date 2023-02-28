import { Test, TestingModule } from '@nestjs/testing';
import { EmailTemplateController } from './emailtemplate.controller';
import { EmailTemplateService } from './emailtemplate.service';
import { PrismaService } from '../prisma/prisma.service';

describe('EmailtemplateController', () => {
  let controller: EmailTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailTemplateController],
      providers: [EmailTemplateService, PrismaService],
    }).compile();

    controller = module.get<EmailTemplateController>(EmailTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
