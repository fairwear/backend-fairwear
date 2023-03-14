import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleEnum } from '@prisma/client';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.userRole.findMany();
  }

  async findById(id: number) {
    return await this.prisma.userRole.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  async findByName(name: RoleEnum) {
    const role = await this.prisma.userRole.findUniqueOrThrow({
      where: {
        name: name,
      },
    });

    return role;
  }
}
