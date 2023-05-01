import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { BrandPostVoteEntry } from './dto/request/entry/brandpost-vote.dto';
import { BrandPostEntity } from './entities/brandpost.entity';

@Injectable()
export class BrandPostService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async create(entity: BrandPostEntity): Promise<BrandPostEntity> {
    const createdEntity = await this.prisma.brandPost.create({
      data: {
        body: entity.body,
        createdAt: entity.createdAt,
        brandId: entity.brandId,
        authorId: entity.authorId,
        topics: {
          create: entity.topics.map((topic) => ({
            topicId: topic.topicId,
            isBad: topic.isBad,
          })),
        },
        relatedItems: {
          create: entity.relatedItems.map((item) => ({
            itemId: item.itemId,
          })),
        },
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: true,
        brand: true,
      },
    });

    return createdEntity;
  }

  async findAll(): Promise<BrandPostEntity[]> {
    return this.prisma.brandPost.findMany({
      include: {
        topics: true,
        relatedItems: true,
        votes: true,
        brand: true,
      },
    });
  }

  async findById(id: number): Promise<BrandPostEntity> {

    const entity = this.prisma.brandPost.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: true,
        brand: true,
      },
    });

    return entity;
}

  async softDelete(id: number, userId: number): Promise<BrandPostEntity> {
    const entity = await this.prisma.brandPost.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    const isUserAdmin = await this.authService.isUserAdmin(userId);

    if (entity.authorId !== userId && !isUserAdmin) {
      throw new Error('You are not the author of this post');
    }

    const deletedEntity = await this.prisma.brandPost.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: true,
        brand: true,
      },
    });

    return deletedEntity;
  }

  async vote(
    id: number,
    userId: number,
    voteEntry: BrandPostVoteEntry,
  ): Promise<BrandPostEntity> {
    const entity = await this.prisma.brandPost.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        votes: true,
      },
    });

    const existingVote = entity.votes.find((vote) => vote.userId === userId);

    if (existingVote) {
      if (existingVote.vote === voteEntry.vote) {
        await this.prisma.brandPostVote.delete({
          where: {
            userId_postId: {
              userId: existingVote.userId,
              postId: existingVote.postId,
            },
          },
        });
      } else {
        await this.prisma.brandPostVote.update({
          where: {
            userId_postId: {
              userId: existingVote.userId,
              postId: existingVote.postId,
            },
          },
          data: {
            vote: voteEntry.vote,
          },
        });
      }
    } else {
      await this.prisma.brandPostVote.create({
        data: {
          userId,
          postId: id,
          vote: voteEntry.vote,
        },
      });
    }

    const createdEntity = this.prisma.brandPost.findUniqueOrThrow({
      where: {
        id: id,
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: true,
        brand: true,
      },
    });

    return createdEntity;
  }

  async getVotes(id: number): Promise<{ upvotes: number; downvotes: number }> {
    const entity = await this.prisma.brandPost.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        votes: true,
      },
    });

    const postVotes = {
      upvotes: entity.votes.filter((vote) => vote.vote === 'UPVOTE').length,
      downvotes: entity.votes.filter((vote) => vote.vote === 'DOWNVOTE').length,
    };

    return postVotes;
  }
}
