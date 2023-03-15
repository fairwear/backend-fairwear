import { Injectable } from '@nestjs/common';
import { InfoPost } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { VoteRequest } from './dto/request/vote-request.sto';
import { InfoPostEntity } from './entities/infopost.entity';

@Injectable()
export class InfoPostService {
  constructor(private prisma: PrismaService) {}
  async create(entity: InfoPostEntity) {
    const infoPost = await this.prisma.infoPost.create({
      data: {
        authorId: entity.author.id,
        itemId: entity.item.id,
        createdAt: new Date(),
        topics: {
          createMany: {
            data: entity.topics.map((topic) => {
              return { topicId: topic.topicId };
            }),
          },
        },
      },
      include: {
        votes: true,
        topics: true,
        author: true,
        item: true,
      },
    });
    return infoPost;
  }

  async findAll() {
    const infoPosts = await this.prisma.infoPost.findMany({
      include: {
        votes: true,
        topics: true,
        author: true,
        item: true,
      },
    });

    return this.sortByVotes(infoPosts);
  }

  async findAllByItemId(itemId: number) {
    const infoPosts = await this.prisma.infoPost.findMany({
      where: {
        itemId: itemId,
      },
      include: {
        votes: true,
        topics: true,
        author: true,
        item: true,
      },
    });

    return this.sortByVotes(infoPosts);
  }

  async findAllByTopicId(topicId: number) {
    const infoPosts = await this.prisma.infoPost.findMany({
      where: {
        topics: {
          some: {
            topicId: topicId,
          },
        },
      },
      include: {
        votes: true,
        topics: true,
        author: true,
        item: true,
      },
    });

    return this.sortByVotes(infoPosts);
  }

  async findById(id: number) {
    const infoPost = await this.prisma.infoPost.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        votes: true,
        topics: true,
        author: true,
        item: true,
      },
    });

    return infoPost;
  }

  async vote(request: VoteRequest) {
    const infoPost = await this.prisma.infoPost.findUniqueOrThrow({
      where: {
        id: request.infoPostId,
      },
      include: {
        votes: true,
        topics: true,
        author: true,
        item: true,
      },
    });

    if (
      infoPost.votes.some(
        (vote) => vote.userId === request.userId && vote.vote === request.vote,
      )
    ) {
      return await this.removeVoteFromInfoPost(
        request.infoPostId,
        request.userId,
      );
    }
    return await this.addVoteToInfoPost(request);
  }

  // IMO, the update method won't be used, as there is no need to update the info post
  // after it has been created. The only thing that can be updated is the deletedAt
  // field, which is done in the delete method. (Leaving it for now, just in case)
  async update(id: number, entity: InfoPostEntity) {
    console.log(entity);

    const infoPost: InfoPost = await this.prisma.infoPost.update({
      where: {
        id: id,
      },
      data: {
        updatedAt: new Date(),
      },
    });
    return infoPost;
  }

  async delete(id: number) {
    return await this.prisma.infoPost.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
  }

  private async removeVoteFromInfoPost(infoPostId: number, userId: number) {
    return await this.prisma.infoPost.update({
      where: {
        id: infoPostId,
      },
      data: {
        votes: {
          deleteMany: {
            userId: userId,
            infoPostId: infoPostId,
          },
        },
      },
    });
  }

  private async addVoteToInfoPost(request: VoteRequest) {
    return await this.prisma.infoPost.update({
      where: {
        id: request.infoPostId,
      },
      data: {
        votes: {
          createMany: {
            data: {
              userId: request.userId,
              vote: request.vote,
            },
          },
        },
      },
    });
  }

  private sortByVotes(posts: InfoPostEntity[]) {
    posts.sort((a, b) => {
      return b.votes.length - a.votes.length;
    });

    return posts;
  }
}
