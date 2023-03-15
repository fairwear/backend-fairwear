import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto } from './dto/request/create-topic.dto';
import { UpdateTopicDto } from './dto/request/update-topic.dto';

@Injectable()
export class TopicService {
  
  constructor(private prisma: PrismaService) {}
  create(entity: CreateTopicDto) {
    const topic = this.prisma.brand.create({
      data: {
        name: entity.name,
        // itemIds: entity.itemIds,
        // subtopicIds: entity.topicIds,
        // userIds: entity.userIds,
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

  update(id: number, entity: UpdateTopicDto) {
    const topic = this.prisma.topic.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        // itemIds: updateTopicDto.itemIds,
        // subtopicIds: updateTopicDto.topicIds,
        // userIds: updateTopicDto.userIds,
      },
    });
    return topic;
    
  }

  delete(id: number) {
    const deletedEntity = this.prisma.topic.delete({
      where: {
        id: id,
      },
    });
    return deletedEntity;
  }
}
