import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  create(entity: UserEntity) {
    const user = this.prisma.user.create({
      data: {
        id: entity.id,
        username: entity.username,
        password: entity.password,
        email: entity.email,
        name: entity.name,
        surname: entity.surname,
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
    });
    return user;
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
