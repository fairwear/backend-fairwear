import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(entity: UserEntity) {
    const basicUserRole = this.prisma.userRole.findByName(RoleEnum.USER);
    const user = this.prisma.user.create({
      data: {
        id: entity.id,
        username: entity.username,
        password: entity.password,
        email: entity.email,
        name: entity.name,
        surname: entity.surname,
        roles: {
          create: {
            role: basicUserRole.role?.id || 0,
          },
        },
      },
    });
    return user;
  }

  findAll() {
    const user = this.prisma.user.findMany();
    return user;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
    return user;
  }

  async isUserAdminByName(username: string) {
    const user = await this.prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found!`);
    }
    const isUserAdmin = user.roles.length > 1;
    return isUserAdmin;
  }

  async isUserAdmin(id: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        roles: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found!`);
    }
    const isUserAdmin = user.roles.length > 1;
    return isUserAdmin;
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
    });
  }

  update(id: number, entity: UserEntity) {
    const user = this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: entity.username,
        password: entity.password,
        email: entity.email,
        name: entity.name,
        surname: entity.surname,
      },
    });
    return user;
  }

  async delete(id: number) {
    const deleteEntity = await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return deleteEntity;
  }
}
