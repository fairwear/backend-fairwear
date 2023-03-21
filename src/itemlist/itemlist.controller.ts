import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemlistService } from './itemlist.service';
import { CreateItemlistDto } from './dto/create-itemlist.dto';
import { UpdateItemlistDto } from './dto/update-itemlist.dto';

@Controller('itemlist')
export class ItemlistController {
  constructor(private readonly itemlistService: ItemlistService) {}

  @Post()
  create(@Body() createItemlistDto: CreateItemlistDto) {
    return this.itemlistService.create(createItemlistDto);
  }

  @Get()
  findAll() {
    return this.itemlistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemlistDto: UpdateItemlistDto) {
    return this.itemlistService.update(+id, updateItemlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemlistService.remove(+id);
  }
}
