import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto } from './dto/request/create-topic.dto';
import { UpdateTopicDto } from './dto/request/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async create(entity: CreateTopicDto, userId: number) {
    const isUserAdmin = this.authService.isUserAdmin(userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const topic = await this.prisma.topic.create({
      data: {
        name: entity.name,
        topicId: entity.topicId,
        createdAt: entity.createdAt,
      },
    });
    return topic;
  }

  async findAll() {
    const topics = await this.prisma.topic.findMany();
    return topics;
  }

  async findById(id: number) {
    const topic = await this.prisma.topic.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return topic;
  }

  async findTopicsByItemIdFromBrand(itemId: number) {
    const relatedBrand = await this.prisma.brand.findFirstOrThrow({
      where: {
        deletedAt: null,
        items: {
          some: {
            id: itemId,
          },
        },
      },
      include: {
        topics: true,
      },
    });

    console.log(relatedBrand);

    const sortedTopics = relatedBrand.topics.sort((a, b) => {
      return a.score - b.score;
    });

    console.log(sortedTopics);

    const topics = sortedTopics.map(async (topic) => {
      return await this.prisma.topic.findFirstOrThrow({
        where: {
          id: topic.topicId,
        },
        include: {
          brands: true,
        },
      });
    });

    return await Promise.all(topics);
  }

  // async findNewestTopicByItemIdFromBrandPosts(itemId: number) {
  //   //TODO: find newest topic by item id from brand posts
  // }

  async update(id: number, entity: UpdateTopicDto, userId: number) {
    const isUserAdmin = this.authService.isUserAdmin(userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const updatedTopic = await this.prisma.topic.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        topicId: entity.topicId,
        updatedAt: entity.updatedAt,
      },
    });
    return updatedTopic;
  }

  async softDelete(id: number, userId: number) {
    const isUserAdmin = this.authService.isUserAdmin(userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const deletedEntity = await this.prisma.topic.update({
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
