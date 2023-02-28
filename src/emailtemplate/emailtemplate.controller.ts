import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailTemplateService } from './emailtemplate.service';
import { CreateEmailtemplateDto } from './dto/request/create-emailtemplate.dto';
import { UpdateEmailtemplateDto } from './dto/request/update-emailtemplate.dto';

@Controller('emailtemplate')
export class EmailtemplateController {
  constructor(private readonly emailtemplateService: EmailTemplateService) {}

  @Post()
  create(@Body() createEmailtemplateDto: CreateEmailtemplateDto) {
    return this.emailtemplateService.create(createEmailtemplateDto);
  }

  @Get()
  findAll() {
    return this.emailtemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailtemplateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailtemplateDto: UpdateEmailtemplateDto,
  ) {
    return this.emailtemplateService.update(+id, updateEmailtemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailtemplateService.remove(+id);
  }
}
