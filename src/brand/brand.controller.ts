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
import GetCurrentUserId from '../auth/decorators/get-current-user-id.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/request/create-brand.dto';
import { UpdateBrandDto } from './dto/request/update-brand.dto';
import { BrandMapper } from './mapper/brand.mapper';

@ApiTags('brand')
@Controller('api/v1/brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() request: CreateBrandDto,
    @GetCurrentUserId() userId: number,
  ) {
    const entity = BrandMapper.toEntity(request, userId);
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
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() request: UpdateBrandDto,
    @GetCurrentUserId() userId: number,
  ) {
    const entity = BrandMapper.toEntity(request, userId);
    const updatedEntity = await this.brandService.update(+id, entity);
    return BrandMapper.toResponse(updatedEntity);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string, @GetCurrentUserId() userId: number) {
    const deletedEntity = await this.brandService.softDelete(+id, userId);
    return BrandMapper.toResponse(deletedEntity);
  }
}
