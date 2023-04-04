import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/request/create-brand.dto';
import { UpdateBrandDto } from './dto/request/update-brand.dto';
import { BrandMapper } from './mapper/brand.mapper';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() request: CreateBrandDto) {
    const entity = BrandMapper.toEntity(request);
    const createdEntity = await this.brandService.create(entity);
    return BrandMapper.toResponse(createdEntity);
  }

  @Get()
  async findAll() {
    const entities = await this.brandService.findAll();
    return BrandMapper.toResponseList(entities);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const entity = await this.brandService.findById(+id);
    if (!entity) return null;
    return BrandMapper.toResponse(entity); 
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UpdateBrandDto) {
    const entity = BrandMapper.toEntity(request);
    const updatedEntity = await this.brandService.update(+id, entity);
    return BrandMapper.toResponse(updatedEntity);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedEntity = await this.brandService.delete(+id);
    return BrandMapper.toResponse(deletedEntity);
  }
}
