import { Injectable } from '@nestjs/common';
import { CreateInfoPostDto } from './dto/request/create-infopost.dto';
import { UpdateInfoPostDto } from './dto/request/update-infopost.dto';

@Injectable()
export class InfoPostService {
  create(createInfopostDto: CreateInfoPostDto) {
    return 'This action adds a new infopost';
  }

  findAll() {
    return `This action returns all infopost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} infopost`;
  }

  update(id: number, updateInfopostDto: UpdateInfoPostDto) {
    return `This action updates a #${id} infopost`;
  }

  remove(id: number) {
    return `This action removes a #${id} infopost`;
  }
}
