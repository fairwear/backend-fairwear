import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInfoPostDto } from './dto/request/create-infopost.dto';
import { UpdateInfoPostDto } from './dto/request/update-infopost.dto';

@Injectable()
export class InfoPostService {
  constructor(private prisma: PrismaService) {}
  async create(request: CreateInfoPostDto) {
    return 'This action adds a new infopost';
  }

  async findAll() {
    return `This action returns all infopost`;
  }

  async findById(id: number) {
    return `This action returns a #${id} infopost`;
  }

  async update(id: number, request: UpdateInfoPostDto) {
    return `This action updates a #${id} infopost`;
  }

  async delete(id: number) {
    return `This action removes a #${id} infopost`;
  }
}
