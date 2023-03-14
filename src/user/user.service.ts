import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { RoleEnum } from '@prisma/client';
import { UserRoleService } from '../user-role/user-role.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private userRoleService: UserRoleService,
  ) {}
  async create(entity: UserEntity) {
    const basicUserRole = this.prisma.userRole.findByName(RoleEnum.USER);
    const response = await this.prisma.user.create({
      data: {
        id: entity.id,
        username: entity.username,
        password: entity.password,
        email: entity.email,
        name: entity.name,
        surname: entity.surname,
        roles: {
          create: {
            roles: basicUserRole.roles?.id || 0,
          },
        },
      },
      include: {
        roles: true,
      },
    });

    const user: UserEntity = {
      id: response.id,
      username: response.username,
      password: response.password,
      email: response.email,
      name: response.name,
      surname: response.surname,
      roles: response.roles,
    };
    return user;
  }

  async findAll() {
    const response = await this.prisma.user.findMany({
      include: { roles: true },
    });

    const users: UserEntity[] = response.map((user) => {
      return {
        id: user.id,
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        surname: user.surname,
        roles: user.roles,
      };
    });
    return users;
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

  async usernameOrEmailExists(usernameOrEmail?: string): Promise<boolean> {
    const res = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            username: usernameOrEmail,
          },
          {
            email: usernameOrEmail,
          },
        ],
      },
    });
    if (res !== null && res !== undefined && res) {
      return true;
    }
    return false;
  }

  async findByUsername(username: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
    });
  }
  async findByEmail(email: string) {
    return await this.prisma.user.findFirstOrThrow({
      where: {
        email: email,
      },
    });
  }
  async update(id: number, entity: UserEntity) {
    const user = await this.prisma.user.update({
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
      include: {
        roles: true,
      },
    });
    return user;
  }

  async delete(id: number) {
    const deleteEntity = await this.prisma.user.delete({
      where: {
        id: id,
      },
      include: {
        roles: true,
      },
    });
    return deleteEntity;
  }
}
