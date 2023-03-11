import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemEntity } from './entities/item.entity';

@Injectable()
export class ItemService {

  constructor(private prisma: PrismaService) {}
  create(entity: ItemEntity) {
    const item = this.prisma.item.create({
      data: {
        name: entity.name,
        score: entity.score,
        //brandId: entity.brandId,
        // topicIds: entity.topicIds,
        // userIds: entity.userIds,
        // reportIds: entity.reportIds,
      },
    });
    return item;
  }

  findAll() {
    const items = this.prisma.item.findMany();
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

  update(id: number, entity: ItemEntity) {
    const item = this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        score: entity.score,
        // brandId: entity.brandId,
        // topicIds: entity.topicIds,
        // userIds: entity.userIds,
        // reportIds: entity.reportIds,
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
