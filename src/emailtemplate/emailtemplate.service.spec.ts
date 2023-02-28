import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { EmailTemplateService } from './emailtemplate.service';

describe('EmailtemplateService', () => {
  let service: EmailTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailTemplateService, PrismaService],
    }).compile();

    service = module.get<EmailTemplateService>(EmailTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
