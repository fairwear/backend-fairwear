import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInfoPostDto } from './dto/request/create-infopost.dto';
import { UpdateInfoPostDto } from './dto/request/update-infopost.dto';
import { InfoPostService } from './infopost.service';
import { InfoPostMapper } from './mapper/infopost.mapper';

@Controller('api/v1/infopost')
export class InfoPostController {
  constructor(private readonly infoPostService: InfoPostService) {}

  @Post()
  async create(@Body() createInfopostDto: CreateInfoPostDto) {
    const entity = InfoPostMapper.toEntity(createInfopostDto);
    return this.infoPostService.create(entity);
  }

  @Get()
  async findAll() {
    return this.infoPostService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.infoPostService.findById(+id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInfopostDto: UpdateInfoPostDto,
  ) {
    const entity = InfoPostMapper.toEntity(updateInfopostDto);
    return this.infoPostService.update(+id, entity);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.infoPostService.delete(+id);
  }
}
