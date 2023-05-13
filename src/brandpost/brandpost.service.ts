import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { BrandPostVoteEntry } from './dto/request/entry/brandpost-vote.dto';
import { BrandPostEntity } from './entities/brandpost.entity';
import { VoteEnum } from '@prisma/client';

const REPORT_PENALTY_WEIGHT = 0.2;
const CONFIDENCE_LEVEL = 1.96;

@Injectable()
export class BrandPostService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}
  async create(entity: BrandPostEntity): Promise<BrandPostEntity> {
    const createdEntity = await this.prisma.brandPost.create({
      data: {
        title: entity.title,
        body: entity.body,
        createdAt: entity.createdAt,
        brandId: entity.brandId,
        authorId: entity.authorId,
        references: {
          createMany: {
            data: entity.references.map((reference) => ({
              ...reference,
            })),
          },
        },

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
        votes: {
          include: {
            user: {
              include: {
                roles: true,
              },
            },
          },
        },
        brand: true,
        author: {
          include: {
            roles: true,
          },
        },
        reports: {
          include: {
            post: true,
            author: {
              include: {
                roles: true,
              },
            },
          },
        },
        references: true,
      },
    });

    return createdEntity;
  }

  async search(query: string): Promise<BrandPostEntity[]> {
    const brandPosts = await this.prisma.brandPost.findMany({
      take: 6,
      where: {
        deletedAt: null,
      },

      orderBy: {
        _relevance: {
          fields: ['title', 'body'],
          search: query,
          sort: 'desc',
        },
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: {
          include: {
            user: {
              include: {
                roles: true,
              },
            },
          },
        },
        brand: {
          include: {
            items: true,
            posts: true,
            topics: true,
          },
        },
        author: {
          include: {
            roles: true,
          },
        },
        reports: {
          include: {
            post: true,
            author: {
              include: {
                roles: true,
              },
            },
          },
        },
        references: true,
      },
    });

    return this.sortPostsByScore(brandPosts);
  }

  async findAll(): Promise<BrandPostEntity[]> {
    const brandPosts = await this.prisma.brandPost.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: {
          include: {
            user: {
              include: {
                roles: true,
              },
            },
          },
        },
        brand: true,
        reports: {
          include: {
            post: true,
            author: {
              include: {
                roles: true,
              },
            },
          },
        },
        author: {
          include: {
            roles: true,
          },
        },
        references: true,
      },
    });
    return this.sortPostsByScore(brandPosts);
  }

  async findById(id: number): Promise<BrandPostEntity> {
    const entity = this.prisma.brandPost.findFirstOrThrow({
      where: {
        AND: [{ id }, { deletedAt: null }],
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: {
          include: {
            user: {
              include: {
                roles: true,
              },
            },
          },
        },
        brand: true,
        reports: {
          include: {
            post: true,
            author: {
              include: {
                roles: true,
              },
            },
          },
        },
        author: {
          include: {
            roles: true,
          },
        },
        references: true,
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
        votes: {
          include: {
            user: {
              include: {
                roles: true,
              },
            },
          },
        },
        brand: true,
        reports: {
          include: {
            post: true,
            author: {
              include: {
                roles: true,
              },
            },
          },
        },
        author: {
          include: {
            roles: true,
          },
        },
        references: true,
      },
    });

    return deletedEntity;
  }

  async getIsVoted(
    id: number,
    userId: number,
  ): Promise<{
    isVoted: boolean;
    vote: VoteEnum | undefined;
  }> {
    console.log(id, userId);
    const entity = await this.prisma.brandPost.findFirstOrThrow({
      where: {
        AND: [{ id }, { deletedAt: null }],
      },
      include: {
        votes: {
          include: {
            user: true,
          },
        },
      },
    });

    console.log(entity);

    const existingVote = entity.votes.find((vote) => vote.userId === userId);
    const res = {
      isVoted: !!existingVote,
      vote: existingVote?.vote,
    };
    return res;
  }

  async vote(
    id: number,
    userId: number,
    voteEntry: BrandPostVoteEntry,
  ): Promise<BrandPostEntity> {
    const initialPostEntity = await this.prisma.brandPost.findFirstOrThrow({
      where: {
        AND: [{ id }, { deletedAt: null }],
      },
      include: {
        votes: {
          include: {
            user: true,
          },
        },
      },
    });

    const existingVote = initialPostEntity.votes.find(
      (vote) => vote.userId === userId,
    );

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

    const updatedPostEntity = this.prisma.brandPost.findFirstOrThrow({
      where: {
        AND: [{ id }, { deletedAt: null }],
      },
      include: {
        topics: true,
        relatedItems: true,
        votes: {
          include: {
            user: {
              include: {
                roles: true,
              },
            },
          },
        },
        brand: true,
        reports: {
          include: {
            post: true,
            author: {
              include: {
                roles: true,
              },
            },
          },
        },
        author: {
          include: {
            roles: true,
          },
        },
        references: true,
      },
    });

    return updatedPostEntity;
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
  async getAuthorId(id: number): Promise<number> {
    const entity = await this.prisma.brandPost.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return entity.authorId;
  }
  // ---------------------------- Algorithm ----------------------------

  calculateScoreForAllPosts = async () => {
    const entities = await this.prisma.brandPost.findMany();
    return await Promise.all(
      entities.map(async (entity) => await this.calculateScoreById(entity.id)),
    );
  };

  async calculateScoreById(id: number) {
    const entity = await this.prisma.brandPost.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        votes: {
          include: {
            user: {
              include: {
                roles: true,
              },
            },
          },
        },
        author: {
          include: {
            roles: true,
          },
        },
        reports: {
          include: {
            post: true,
            author: {
              include: {
                roles: true,
              },
            },
          },
        },
        brand: true,
        topics: true,
        relatedItems: true,
        references: true,
      },
    });

    const lowerBound = this.getLowerBoundWithUserTrustScore(entity);
    const penaltyFactor = this.getPenaltyFactorWithUserTrustScore(entity);

    const finalScore = await this.getFinalScore(lowerBound, penaltyFactor);

    if (finalScore) {
      const updatedEntity = await this.prisma.brandPost.update({
        where: {
          id,
        },
        data: {
          postScore: finalScore,
        },
      });

      return updatedEntity;
    }
  }

  // ---------------------------- Lower Bound ----------------------------

  getLowerBound = (
    upvoteCount: number,
    confidenceLevel: number,
    totalVoteCount: number,
  ) => {
    return (
      (upvoteCount +
        Math.pow(confidenceLevel, 2) / (2 * totalVoteCount) -
        confidenceLevel *
          Math.sqrt(
            (upvoteCount * (1 - upvoteCount)) / totalVoteCount +
              Math.pow(confidenceLevel, 2) / (4 * Math.pow(totalVoteCount, 2)),
          )) /
      (1 + Math.pow(confidenceLevel, 2) / totalVoteCount)
    );
  };

  getLowerBoundWithUserTrustScore = (brandPost: BrandPostEntity) => {
    const normalizedVotes = brandPost.votes.map(
      (vote) => vote.user.userTrustScore * 1,
    );
    const normalizedUpvotes = brandPost.votes.map((vote) =>
      vote.vote === 'UPVOTE' ? vote.user.userTrustScore * 1 : 0,
    );

    const normalizedVoteCount = normalizedVotes.reduce((a, b) => a + b, 0);
    const normalizedUpvoteCount = normalizedUpvotes.reduce((a, b) => a + b, 0);

    const lowerBound = this.getLowerBound(
      normalizedUpvoteCount,
      CONFIDENCE_LEVEL,
      normalizedVoteCount,
    );

    return lowerBound;
  };
  // ---------------------------- Penalty Factor ----------------------------
  getPenaltyFactor = (upvoteCount: number, reportCount: number) => {
    return upvoteCount * (reportCount / (reportCount + REPORT_PENALTY_WEIGHT));
  };

  getPenaltyFactorWithUserTrustScore = (brandPost: BrandPostEntity) => {
    const normalizedVotes = brandPost.votes.map(
      (vote) => vote.user.userTrustScore * 1,
    );
    const normalizedReports = brandPost.reports.map(
      (report) => report.author.userTrustScore * 1,
    );

    const normalizedVoteCount = normalizedVotes.reduce((a, b) => a + b, 0);
    const normalizedReportCount = normalizedReports.reduce((a, b) => a + b, 0);

    const penaltyFactor = this.getPenaltyFactor(
      normalizedVoteCount,
      normalizedReportCount,
    );

    return penaltyFactor;
  };
  // ---------------------------- Final Score ----------------------------
  getFinalScore = async (lowerBound: number, penaltyFactor: number) => {
    return lowerBound - penaltyFactor;
  };

  // ---------------------------- Sort ----------------------------
  sortPostsByScore = (posts: BrandPostEntity[]) => {
    return posts.sort((a, b) => b.postScore - a.postScore);
  };
}
