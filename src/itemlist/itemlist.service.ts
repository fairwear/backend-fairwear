import { Injectable } from '@nestjs/common';
import { CreateItemlistDto } from './dto/create-itemlist.dto';
import { UpdateItemlistDto } from './dto/update-itemlist.dto';

@Injectable()
export class ItemlistService {
  create(createItemlistDto: CreateItemlistDto) {
    return 'This action adds a new itemlist';
  }

  findAll() {
    return `This action returns all itemlist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itemlist`;
  }

  update(id: number, updateItemlistDto: UpdateItemlistDto) {
    return `This action updates a #${id} itemlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} itemlist`;
  }
}
