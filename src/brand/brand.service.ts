import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateBrandDto } from './dto/request/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}
  async create(entity: BrandEntity) {
    const brand = await this.prisma.brand.create({
      data: {
        name: entity.name,
        userId: entity.userId,
      },
    });
    return brand;
  }

  async findAll() {
    const brands = await this.prisma.brand.findMany();
    return brands;
  }

  async findById(id: number) {
    const brand = await this.prisma.brand.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return brand;
  }

  async findByName(name: string) {
    const brand = await this.prisma.brand.findUniqueOrThrow({
      where: {
        name: name,
      },
    });
    return brand;
  }

  async update(id: number, entity: UpdateBrandDto) {
    const brand = await this.prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
      },
    });
    return brand;
  }

  async delete(id: number) {
    const deletedEntity = await this.prisma.brand.delete({
      where: {
        id: id,
      },
    });
    return deletedEntity;
  }
}
