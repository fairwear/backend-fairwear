import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEmailTemplate } from './dto/request/create-emailtemplate.dto';
import { UpdateEmailTemplate } from './dto/request/update-emailtemplate.dto';
import { EmailTemplateService } from './emailtemplate.service';
import { EmailTemplateMapper } from './mapper/emailtemplate.mapper';

@Controller('emailtemplate')
export class EmailTemplateController {
  constructor(private readonly emailtemplateService: EmailTemplateService) {}

  @Post()
  async create(@Body() request: CreateEmailTemplate) {
    const entity = EmailTemplateMapper.toEntity(request);
    const createdEntity = await this.emailtemplateService.create(entity);
    return EmailTemplateMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll() {
    const entities = await this.emailtemplateService.findAll();
    return EmailTemplateMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.emailtemplateService.findById(+id);
    return EmailTemplateMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UpdateEmailTemplate) {
    const entity = EmailTemplateMapper.toEntity(request);
    const updatedEntity = await this.emailtemplateService.update(+id, entity);
    return EmailTemplateMapper.toResponse(updatedEntity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedEntity = await this.emailtemplateService.delete(+id);
    return EmailTemplateMapper.toResponse(deletedEntity);
  }
}
