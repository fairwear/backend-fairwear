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

@Controller('infopost')
export class InfoPostController {
  constructor(private readonly infopostService: InfoPostService) {}

  @Post()
  create(@Body() createInfopostDto: CreateInfoPostDto) {
    return this.infopostService.create(createInfopostDto);
  }

  @Get()
  findAll() {
    return this.infopostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.infopostService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInfopostDto: UpdateInfoPostDto,
  ) {
    return this.infopostService.update(+id, updateInfopostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infopostService.remove(+id);
  }
}
