import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import GetCurrentUserId from '../auth/decorators/get-current-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateTopicDto } from './dto/request/create-topic.dto';
import { UpdateTopicDto } from './dto/request/update-topic.dto';
import { TopicMapper } from './mapper/topic.mapper';
import { TopicService } from './topic.service';

@ApiTags('topic')
@Controller('api/v1/topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @GetCurrentUserId() userId: number,
    @Body() request: CreateTopicDto,
  ) {
    const entity = TopicMapper.toEntity(request);
    const createdEntity = await this.topicService.create(entity, userId);
    return TopicMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll() {
    const entities = await this.topicService.findAll();
    return TopicMapper.toResponseList(entities);
  }

  @Get('filter')
  async findAllFilteredBy(
    @Query('search') search?: string,
    @Query('isSubtopic') isSubtopic?: boolean,
    @Query('isDeleted') isDeleted?: boolean,
  ) {
    const entities = await this.topicService.findAllFilteredBy(
      search,
      isSubtopic,
      isDeleted,
    );
    return TopicMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.topicService.findById(+id);
    if (!entity) return null;
    return TopicMapper.toResponse(entity);
  }

  @Get('item/:id')
  async findTopicsFromBrandByItemId(@Param('id') id: string) {
    const entities = await this.topicService.findTopicsByItemIdFromBrand(+id);
    return TopicMapper.toCustomResponseList(entities);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() request: UpdateTopicDto,
  ) {
    const entity = TopicMapper.toEntity(request);
    const updatedEntity = await this.topicService.update(+id, entity, userId);
    return TopicMapper.toResponse(updatedEntity);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    const deletedEntity = await this.topicService.softDelete(+id, userId);
    return TopicMapper.toResponse(deletedEntity);
  }
}
