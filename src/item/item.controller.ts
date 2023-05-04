import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/request/create-item.dto';
import { UpdateItemDto } from './dto/request/update-item.dto';
import { ItemService } from './item.service';
import { ItemMapper } from './mapper/item.mapper';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import GetCurrentUserId from '../auth/decorators/get-current-user-id.decorator';

@ApiTags('item')
@Controller('api/v1/item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() request: CreateItemDto,
    @GetCurrentUserId() userId: number,
  ) {
    const entity = ItemMapper.toEntity(request, userId);
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
    return ItemMapper.toResponse(entity);
  }

  @Get(':name')
  async findByName(@Param('name') name: string) {
    const entity = await this.itemService.findByName(name);
    return ItemMapper.toResponse(entity);
  }

  @Get(':barcode')
  async findByBarcode(@Param('barcode') barcode: string) {
    const entity = await this.itemService.findByBarcode(barcode);
    return ItemMapper.toResponse(entity);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @GetCurrentUserId() userId: number,
    @Body() request: UpdateItemDto,
  ) {
    const entity = ItemMapper.toEntity(request, userId);
    const updatedEntity = await this.itemService.update(+id, entity);
    return ItemMapper.toResponse(updatedEntity);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    const deletedEntity = await this.itemService.softDelete(+id, userId);
    return ItemMapper.toResponse(deletedEntity);
  }
}
