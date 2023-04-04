import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto } from './dto/request/create-item.dto';
import { ItemEntity } from './entities/item-entity';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}
  async create(entity: ItemEntity) {
    const item = await this.prisma.item.create({
      data: {
        name: entity.name,
        brandId: entity.brandId,
        userId: entity.userId,
      },
    });
    return item;
  }

  async findAll() {
    const items = await this.prisma.item.findMany();
    return items;
  }

  async findById(id: number) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return item;
  }

  async findByName(name: string) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: {
        name: name,
      },
    });
    return item;
  }

  async update(id: number, entity: ItemEntity) {
    const item = await this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
      },
    });
    return item;
  }

  async delete(id: number) {
    const deletedEntity = await this.prisma.item.delete({
      where: {
        id: id,
      },
    });
    return deletedEntity;
  }
}
