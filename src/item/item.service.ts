import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ItemEntity } from './entity/item-entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ItemService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async create(entity: ItemEntity) {
    const item = await this.prisma.item.create({
      data: {
        name: entity.name,
        brandId: entity.brandId,
        userId: entity.userId,
        createdAt: entity.createdAt,
      },
    });
    return item;
  }

  async findAll() {
    const items = await this.prisma.item.findMany();
    return items;
  }

  async search(query: string): Promise<ItemEntity[]> {
    const items = await this.prisma.item.findMany({
      take: 6,
      where: {
        deletedAt: null,
      },
      orderBy: {
        _relevance: {
          fields: ['name'],
          search: query,
          sort: 'desc',
        },
      },
    });

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
    const item = await this.prisma.item.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    const isUserAdmin = this.authService.isUserAdmin(entity.userId);

    if (!isUserAdmin && item.userId !== entity.userId) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const updatedItem = await this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        brandId: entity.brandId,
        updatedAt: entity.updatedAt,
      },
    });
    return updatedItem;
  }

  async softDelete(id: number, userId: number) {
    const item = await this.prisma.item.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    const isUserAdmin = this.authService.isUserAdmin(userId);

    if (!isUserAdmin && item.userId !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }
    const deletedEntity = await this.prisma.item.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
    return deletedEntity;
  }
}
