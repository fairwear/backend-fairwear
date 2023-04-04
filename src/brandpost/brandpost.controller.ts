import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandpostService } from './brandpost.service';
import { CreateBrandpostDto } from './dto/request/create-brandpost.dto';
import { UpdateBrandpostDto } from './dto/update-brandpost.dto';

@Controller('brandpost')
export class BrandpostController {
  constructor(private readonly brandpostService: BrandpostService) {}

  @Post()
  create(@Body() createBrandpostDto: CreateBrandpostDto) {
    return this.brandpostService.create(createBrandpostDto);
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
    @Body() updateBrandpostDto: UpdateBrandpostDto,
  ) {
    return this.brandpostService.update(+id, updateBrandpostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandpostService.remove(+id);
  }
}
