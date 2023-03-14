import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InfoPostEntity } from './entities/infopost.entity';

@Injectable()
export class InfoPostService {
  constructor(private prisma: PrismaService) {}
  async create(entity: InfoPostEntity) {
    // const infoPost = await this.prisma.infoPost.create({
    //   data: entity
    // });
    // return infoPost
  }

  async findAll() {
    return await this.prisma.infoPost.findMany();
  }

  async findById(id: number) {
    const infoPost = await this.prisma.infoPost.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    return infoPost;
  }

  async update(id: number, entity: InfoPostEntity) {
    // const infoPost = await this.prisma.infoPost.update({
    //   where: {
    //     id: id,
    //   },
    //   data: entity,
    // });
    // return infoPost;
  }

  async delete(id: number) {
    return await this.prisma.infoPost.delete({
      where: {
        id: id,
      },
    });
  }
}
