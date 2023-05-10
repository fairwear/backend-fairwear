import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';
import { UserResponse } from './dto/response/user.response.dto';
import { UserEntity } from './entities/user.entity';

const DEFAULT_USER_TRUST_SCORE = 0.5;
const W_UVR = 0.3;
const W_DVR = 0.2;
const W_SPK = 0.2;
const W_ENG = 0.1;
const W_RPU = 0.2;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(entity: UserEntity) {
    try {
      const response = await this.prisma.user.create({
        data: {
          username: entity.username,
          password: entity.password,
          email: entity.email,
          name: entity.name,
          surname: entity.surname,
          roles: {
            createMany: {
              data: entity.roles.map((role) => {
                return {
                  roleId: role.roleId,
                };
              }),
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
        refreshToken: response.refreshToken,
        userTrustScore: response.userTrustScore,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
        deletedAt: response.deletedAt,
      };
      return user;
    } catch (error) {
      throw new PrismaClientKnownRequestError('User already exists!', error);
    }
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
        refreshToken: user.refreshToken,
        userTrustScore: user.userTrustScore,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
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
    try {
      const user = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
        include: {
          roles: true,
        },
      });

      const isUserAdmin = user.roles.length > 1;
      return isUserAdmin;
    } catch (error) {
      throw new PrismaClientKnownRequestError('User Not Found', error);
    }
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
      include: {
        roles: true,
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
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          username: entity.username,
          password: entity.password,
          name: entity.name,
          surname: entity.surname,
        },
        include: {
          roles: true,
        },
      });
      return user;
    } catch (error) {
      throw new PrismaClientKnownRequestError('User Not Found', error);
    }
  }

  async softDelete(id: number) {
    const deleteEntity = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        roles: true,
      },
    });
    return deleteEntity;
  }

  public async validRefreshToken(
    email: string,
    refreshToken: string,
  ): Promise<UserResponse | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: email,
        refreshToken: refreshToken,
      },
    });
    if (!user) {
      return null;
    }
    const currentUser = new UserResponse();
    currentUser.id = user.id;
    currentUser.username = user.username;
    currentUser.email = user.email;
    currentUser.name = user.name;
    currentUser.surname = user.surname;

    return currentUser;
  }

  // ---------------------------- Algorithm ----------------------------

  calculateAllUserTrustScores = async () => {
    const users = await this.prisma.user.findMany();
    return await Promise.all(
      users.map((user) => this.calculateUserTrustScoreById(user.id)),
    );
  };

  calculateUserTrustScoreById = async (userId: number) => {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      include: {
        posts: {
          include: {
            votes: true,
            reports: {
              include: {
                author: true,
              },
            },
          },
        },
        votes: true,
      },
    });

    const upvotesReceived = user.posts.reduce((acc, post) => {
      const upvotes = post.votes.filter((vote) => vote.vote === 'UPVOTE');
      return acc + upvotes.length;
    }, 0);
    const downvotesReceived = user.posts.reduce((acc, post) => {
      const downvotes = post.votes.filter((vote) => vote.vote === 'DOWNVOTE');
      return acc + downvotes.length;
    }, 0);

    const postedInLastMonth = user.posts.filter((post) => {
      const postDate = new Date(post.createdAt);
      const currentDate = new Date();
      const monthAgo = new Date();
      monthAgo.setMonth(currentDate.getMonth() - 1);
      return postDate > monthAgo;
    }).length;

    const reportsReceivedCount = user.posts
      .map((post) => {
        return post.reports.map((report) => report.author.userTrustScore * 1);
      })
      .map((report) => report.reduce((acc, curr) => acc + curr, 0))
      .reduce((acc, curr) => acc + curr, 0);

    // TODO: get user status, profession and knowledge
    const userStatus = 0;
    const userProfession = 0;
    const userKnowledge = 0;

    const finalUTS = this.getFinalUserTrustScore(
      upvotesReceived,
      downvotesReceived,
      postedInLastMonth,
      reportsReceivedCount,
      userStatus,
      userProfession,
      userKnowledge,
    );

    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        userTrustScore: finalUTS,
      },
    });
  };

  getFinalUserTrustScore = (
    upvotesReceived: number,
    downvotesReceived: number,
    userEngagement: number,
    reportsOnUserPosts: number,
    userStatus: number,
    userProfession: number,
    userKnowledge: number,
  ) => {
    const normalized_upvotes_received = upvotesReceived / 100;
    const normalized_downvotes_received = downvotesReceived / 100;
    const normalized_status_profession_knowledge =
      (userStatus + userProfession + userKnowledge) / 3;
    const normalized_engagement = userEngagement / 10;
    const normalized_reports_on_user_posts = reportsOnUserPosts / 5;

    const finalUTS =
      DEFAULT_USER_TRUST_SCORE +
      W_UVR * normalized_upvotes_received +
      W_DVR * normalized_downvotes_received +
      W_SPK * normalized_status_profession_knowledge +
      W_ENG * normalized_engagement +
      W_RPU * normalized_reports_on_user_posts;

    return finalUTS;
  };
}
