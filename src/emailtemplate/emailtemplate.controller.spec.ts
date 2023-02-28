import { Test, TestingModule } from '@nestjs/testing';
import { EmailtemplateController } from './emailtemplate.controller';
import { EmailTemplateService } from './emailtemplate.service';

describe('EmailtemplateController', () => {
  let controller: EmailtemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailtemplateController],
      providers: [EmailTemplateService],
    }).compile();

    controller = module.get<EmailtemplateController>(EmailtemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
