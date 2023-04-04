import { Injectable } from '@nestjs/common';
import { CreateBrandPostDto } from './dto/request/create-brandpost.dto';
import { UpdateBrandPostDto } from './dto/request/update-brandpost.dto';

@Injectable()
export class BrandPostService {
  create(createBrandPostDto: CreateBrandPostDto) {
    return 'This action adds a new brandpost';
  }

  findAll() {
    return `This action returns all brandpost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brandpost`;
  }

  update(id: number, updateBrandPostDto: UpdateBrandPostDto) {
    return `This action updates a #${id} brandpost`;
  }

  remove(id: number) {
    return `This action removes a #${id} brandpost`;
  }
}
