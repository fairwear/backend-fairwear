import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/request/create-item.dto';
import { UpdateItemDto } from './dto/request/update-item.dto';
import { ItemMapper } from './mapper/item.mapper';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  async create(@Body() request: CreateItemDto) {
    const entity = ItemMapper.toEntity(request);
    const createdEntity = await this.itemService.create(entity);
    return ItemMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll() {
    const entities = await this.itemService.findAll();
    return ItemMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.itemService.findById(+id);
    if (!entity) return null;
    return ItemMapper.toResponse(entity);
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    const entity = await this.itemService.findByName(name);
    if (!entity) return null;
    return ItemMapper.toResponse(entity);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UpdateItemDto) {
    const entity = ItemMapper.toEntity(request);
    const updatedEntity = await this.itemService.update(+id, entity);
    return ItemMapper.toResponse(updatedEntity);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedEntity = await this.itemService.softDelete(+id);
    return ItemMapper.toResponse(deletedEntity);
  }
}
