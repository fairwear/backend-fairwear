import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { BrandEntity } from './entities/brand.entity';

@Injectable()
export class BrandService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
  ) {}

  async create(entity: BrandEntity): Promise<BrandEntity> {
    const createdBrand = await this.prisma.brand.create({
      data: {
        name: entity.name,
        userId: entity.userId,
        createdAt: entity.createdAt,
      },
      include: {
        items: true,
        posts: {
          include: {
            brand: true,
            relatedItems: true,
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
            votes: {
              include: {
                user: {
                  include: {
                    roles: true,
                  },
                },
              },
            },
            topics: true,
          },
        },
        topics: {
          select: {
            topic: true,
          },
        },
      },
    });

    const newTopics = createdBrand.topics.map((topic) => topic.topic);
    const brand: BrandEntity = { ...createdBrand, topics: newTopics };

    return brand;
  }

  async findAll(): Promise<BrandEntity[]> {
    const brands = await this.prisma.brand.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        items: true,

        posts: {
          include: {
            brand: true,
            relatedItems: true,
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
            votes: {
              include: {
                user: {
                  include: {
                    roles: true,
                  },
                },
              },
            },
            topics: true,
          },
        },
        topics: {
          select: {
            topic: true,
          },
        },
      },
    });
    const mappedBrands = brands.map((brand) => {
      const newTopics = brand.topics.map((topic) => topic.topic);
      return { ...brand, topics: newTopics };
    });

    return mappedBrands;
  }

  async search(query: string): Promise<BrandEntity[]> {
    const brands = await this.prisma.brand.findMany({
      take: 6,
      where: {
        deletedAt: null,
      },
      orderBy: {
        _relevance: {
          fields: ['name'],
          search: query,
          sort: 'desc',
        },
      },
      include: {
        items: true,
        posts: {
          include: {
            brand: true,
            relatedItems: true,
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
            votes: {
              include: {
                user: {
                  include: {
                    roles: true,
                  },
                },
              },
            },
            topics: true,
          },
        },
        topics: {
          select: {
            topic: true,
          },
        },
      },
    });

    const mappedBrands = brands.map((brand) => {
      const newTopics = brand.topics.map((topic) => topic.topic);
      return { ...brand, topics: newTopics };
    });

    return mappedBrands;
  }

  async findById(id: number): Promise<BrandEntity> {
    const brand = await this.prisma.brand.findFirstOrThrow({
      where: {
        AND: [{ id: id }, { deletedAt: null }],
      },
      include: {
        items: true,
        posts: {
          include: {
            brand: true,
            relatedItems: true,
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
            votes: {
              include: {
                user: {
                  include: {
                    roles: true,
                  },
                },
              },
            },
            topics: true,
          },
        },
        topics: {
          select: {
            topic: true,
          },
        },
      },
    });

    const newTopics = brand.topics.map((topic) => topic.topic);
    const mappedBrand: BrandEntity = { ...brand, topics: newTopics };

    return mappedBrand;
  }

  async findByName(name: string): Promise<BrandEntity> {
    const brand = await this.prisma.brand.findFirstOrThrow({
      where: {
        AND: [{ name }, { deletedAt: null }],
      },
      include: {
        items: true,
        posts: {
          include: {
            brand: true,
            relatedItems: true,
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
            votes: {
              include: {
                user: {
                  include: {
                    roles: true,
                  },
                },
              },
            },
            topics: true,
          },
        },
        topics: {
          select: {
            topic: true,
          },
        },
      },
    });

    const newTopics = brand.topics.map((topic) => topic.topic);
    const mappedBrand = { ...brand, topics: newTopics };

    return mappedBrand;
  }

  async update(id: number, entity: BrandEntity): Promise<BrandEntity> {
    const isUserAdmin = this.authService.isUserAdmin(entity.userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const updatedBrand = await this.prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        name: entity.name,
        updatedAt: entity.updatedAt,
      },
      include: {
        items: true,
        posts: {
          include: {
            brand: true,
            relatedItems: true,
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
            votes: {
              include: {
                user: {
                  include: {
                    roles: true,
                  },
                },
              },
            },
            topics: true,
          },
        },
        topics: {
          select: {
            topic: true,
          },
        },
      },
    });

    const newTopics = updatedBrand.topics.map((topic) => topic.topic);
    const brand = { ...updatedBrand, topics: newTopics };

    return brand;
  }

  async softDelete(id: number, userId: number): Promise<BrandEntity> {
    const isUserAdmin = this.authService.isUserAdmin(userId);

    if (!isUserAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action',
      );
    }

    const deletedEntity = await this.prisma.brand.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
      include: {
        items: true,
        posts: {
          include: {
            brand: true,
            relatedItems: true,
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
            votes: {
              include: {
                user: {
                  include: {
                    roles: true,
                  },
                },
              },
            },
            topics: true,
          },
        },
        topics: {
          select: {
            topic: true,
          },
        },
      },
    });

    const newTopics = deletedEntity.topics.map((topic) => topic.topic);
    const brand = { ...deletedEntity, topics: newTopics };

    return brand;
  }
}
