import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateInfopostDto } from './dto/request/create-infopost.dto';
import { UpdateInfopostDto } from './dto/request/update-infopost.dto';
import { InfopostService } from './infopost.service';

@Controller('infopost')
export class InfopostController {
  constructor(private readonly infopostService: InfopostService) {}

  @Post()
  create(@Body() createInfopostDto: CreateInfopostDto) {
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
    @Body() updateInfopostDto: UpdateInfopostDto,
  ) {
    return this.infopostService.update(+id, updateInfopostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.infopostService.remove(+id);
  }
}
