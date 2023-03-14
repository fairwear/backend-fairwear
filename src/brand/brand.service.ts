import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBrandDto } from './dto/request/create-brand.dto';
import { UpdateBrandDto } from './dto/request/update-brand.dto';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}
  create(entity: BrandEntity) {
    const brand = this.prisma.brand.create({
      data: {
        name: entity.name,
        // topicIds: entity.topicIds,
        // itemIds: entity.itemIds,
      },
    });
    return brand;
  }

  findAll() {
    const brands = this.prisma.brand.findMany();
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

  update(id: number, entity: UpdateBrandDto) {
    const brand = this.prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        // topicIds: entity.topicIds,
        // itemIds: entity.itemIds,
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
