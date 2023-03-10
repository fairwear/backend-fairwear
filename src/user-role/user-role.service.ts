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
    return await this.prisma.userRole.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findByRole(role: RoleEnum) {
    return await this.prisma.userRole.findUnique({
      where: {
        role: role,
      },
    });
  }
  async findByName(name: string) {
    if (name == 'User') {
      return await this.prisma.userRole.findUnique({
        where: {
          name: RoleEnum.USER,
        },
      });
    } else if (name == 'Admin') {
      return await this.prisma.userRole.findUnique({
        where: {
          name: RoleEnum.ADMIN,
        },
      });
    }
  }
}
