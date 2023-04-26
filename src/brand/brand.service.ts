import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async create(entity: BrandEntity) {
    const brand = await this.prisma.brand.create({
      data: {
        name: entity.name,
        userId: entity.userId,
        createdAt: entity.createdAt,
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

  async update(id: number, entity: BrandEntity) {
    const isUserAdmin = this.authService.isUserAdmin(entity.userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const updatedBrand = await this.prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        updatedAt: entity.updatedAt,
      },
    });
    return updatedBrand;
  }

  async softDelete(id: number, userId: number) {
    const isUserAdmin = this.authService.isUserAdmin(userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const deletedEntity = await this.prisma.brand.update({
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
