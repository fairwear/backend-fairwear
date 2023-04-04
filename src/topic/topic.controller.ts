import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTopicDto } from './dto/request/create-topic.dto';
import { UpdateTopicDto } from './dto/request/update-topic.dto';
import { TopicMapper } from './mapper/topic.mapper';
import { TopicService } from './topic.service';

@ApiTags('topic')
@Controller('api/v1topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  async create(@Body() request: CreateTopicDto) {
    const entity = TopicMapper.toEntity(request);
    const createdEntity = await this.topicService.create(entity);
    return TopicMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll() {
    const entities = await this.topicService.findAll();
    return TopicMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.topicService.findById(+id);
    if (!entity) return null;
    return TopicMapper.toResponse(entity);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() request: UpdateTopicDto) {
    const entity = TopicMapper.toEntity(request);
    const updatedEntity = await this.topicService.update(+id, entity);
    return TopicMapper.toResponse(updatedEntity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedEntity = await this.topicService.delete(+id);
    return TopicMapper.toResponse(deletedEntity);
  }
}
