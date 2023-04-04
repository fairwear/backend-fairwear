import { Injectable } from '@nestjs/common';
import { CreateBrandpostDto } from './dto/request/create-brandpost.dto';
import { UpdateBrandpostDto } from './dto/update-brandpost.dto';

@Injectable()
export class BrandpostService {
  create(createBrandpostDto: CreateBrandpostDto) {
    return 'This action adds a new brandpost';
  }

  findAll() {
    return `This action returns all brandpost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brandpost`;
  }

  update(id: number, updateBrandpostDto: UpdateBrandpostDto) {
    return `This action updates a #${id} brandpost`;
  }

  remove(id: number) {
    return `This action removes a #${id} brandpost`;
  }
}
