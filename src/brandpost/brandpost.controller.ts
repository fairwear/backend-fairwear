import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandPostService } from './brandpost.service';
import { CreateBrandPostDto } from './dto/request/create-brandpost.dto';
import { UpdateBrandPostDto } from './dto/request/update-brandpost.dto';

@Controller('api/v1/brandpost')
export class BrandPostController {
  constructor(private readonly brandpostService: BrandPostService) {}

  @Post()
  create(@Body() createBrandPostDto: CreateBrandPostDto) {
    return this.brandpostService.create(createBrandPostDto);
  }

  @Get()
  findAll() {
    return this.brandpostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandpostService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandPostDto: UpdateBrandPostDto,
  ) {
    return this.brandpostService.update(+id, updateBrandPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandpostService.remove(+id);
  }
}
