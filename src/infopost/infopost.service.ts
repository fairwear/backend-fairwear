import { Injectable } from '@nestjs/common';
import { CreateInfopostDto } from './dto/request/create-infopost.dto';
import { UpdateInfopostDto } from './dto/request/update-infopost.dto';

@Injectable()
export class InfopostService {
  create(createInfopostDto: CreateInfopostDto) {
    return 'This action adds a new infopost';
  }

  findAll() {
    return `This action returns all infopost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infopost`;
  }

  update(id: number, updateInfopostDto: UpdateInfopostDto) {
    return `This action updates a #${id} infopost`;
  }

  remove(id: number) {
    return `This action removes a #${id} infopost`;
  }
}
