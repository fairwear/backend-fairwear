import { PrismaClient, UserRoleToUser } from '@prisma/client';
import { UserEntity } from 'src/user/entities/user.entity';
import { DataFactory } from './data/DataFactory';
import { BrandPostEntity } from '../src/brandpost/entities/brandpost.entity';
import { ItemEntity } from '../src/item/entity/item-entity';

export const prisma = new PrismaClient();
const dataFactory: DataFactory = DataFactory.getInstance();

export const main = async () => {
  console.log('Seeding database...');

  // ----------------------------
  // User Role test data

  const userR = dataFactory.getBasicUserRole();
  const adminR = dataFactory.getAdminUserRole();
  const userRole = await prisma.userRole.upsert({
    where: {
      name: userR.name,
    },
    update: {},
    create: {
      name: userR.name,
    },
  });
  const adminRole = await prisma.userRole.upsert({
    where: {
      name: adminR.name,
    },
    update: {},
    create: {
      name: adminR.name,
    },
  });

  // ----------------------------
  // User test data

  const users = await dataFactory.getUserListSeed();
  const res1 = users.map(async (user: UserEntity) => {
    return await prisma.user.upsert({
      where: {
        username: user.username,
      },
      update: {},
      create: {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        surname: user.surname,
        roles: {
          createMany: {
            data: {
              roleId: userRole.id,
            },
          },
        },
      },
    });
  });

  await Promise.all(res1);
  const lastThreeUsers = await Promise.all(res1.slice(-3));
  const userIds = lastThreeUsers.map((user: { id: any }) => {
    return user.id;
  });

  await prisma.userRole.upsert({
    where: { id: adminRole.id },
    update: {},
    create: {
      users: {
        createMany: {
          data: userIds.map((id: any) => ({
            userId: id,
          })),
        },
      },
    },
  });
  const roles = [userRole, adminRole];
  const user = dataFactory.getValidUser();

  await prisma.user.upsert({
    where: { username: user.username },
    update: {},
    create: {
      username: user.username,
      password: user.password,
      email: user.email,
      name: user.name,
      surname: user.surname,

      roles: {
        createMany: {
          data: roles.map((role) => ({
            roleId: role.id,
          })),
        },
      },
    },
  });

  await Promise.all([res1]);

  const tempAdminUsers = dataFactory.getAdminUserList();
  const adminUsers = tempAdminUsers.filter(
    (user: { id: any; roles: UserRoleToUser[] }) => {
      const userRoleToUser: UserRoleToUser = {
        userId: user.id,
        roleId: adminRole.id,
      };
      return user.roles.includes(userRoleToUser);
    },
  );

  const res2 = adminUsers.map(async (user: UserEntity) => {
    return await prisma.user.upsert({
      where: {
        username: user.username,
      },
      update: {
        roles: {
          createMany: {
            data: {
              roleId: adminRole.id,
            },
          },
        },
      },
      create: {
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        surname: user.surname,
        roles: {
          createMany: {
            data: {
              roleId: adminRole.id,
            },
          },
        },
      },
    });
  });

  await Promise.all(res2);

  console.log('User data seed success!');

  // --------------------------------
  // Email Template test data

  const emailTemplates = dataFactory.getEmailTemplateList();
  emailTemplates.forEach(
    async (emailTemplate: {
      name: any;
      subject: any;
      body: any;
      createdAt: any;
      updatedAt: any;
      deletedAt: any;
    }) => {
      await prisma.emailTemplate.upsert({
        where: { name: emailTemplate.name },
        update: {},
        create: {
          name: emailTemplate.name,
          subject: emailTemplate.subject,
          body: emailTemplate.body,
          createdAt: emailTemplate.createdAt,
          updatedAt: emailTemplate.updatedAt,
          deletedAt: emailTemplate.deletedAt,
        },
      });
    },
  );

  console.log('Successfully created email templates');

  // --------------------------------
  // Brand test data

  await Promise.all(res1);
  const brands = dataFactory.getBrandsSeed();
  brands.forEach(async (brand: { name: any; userId: any; createdAt: any }) => {
    await prisma.brand.upsert({
      where: { name: brand.name },
      update: {},
      create: {
        name: brand.name,
        createdBy: {
          connect: {
            id: brand.userId,
          },
        },
        createdAt: brand.createdAt,
      },
    });
  });

  console.log('Successfully created brands');

  //--------------------------------
  // Topic test data

  const topics = dataFactory.getTopicsSeed();
  topics.forEach(async (topic) => {
    await prisma.topic.upsert({
      where: { name: topic.name },
      update: {},
      create: {
        name: topic.name,
      },
    });
  });

  console.log('Successfully created topics');

  //--------------------------------
  // Item test data

  const items = dataFactory.getItemSeed();
  items.forEach(async (item: ItemEntity) => {
    await prisma.item.upsert({
      where: { name: item.name },
      update: {},
      create: {
        name: item.name,
        imageUrl: item.imageUrl,
        barcode: item.barcode,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        deletedAt: item.deletedAt,
        brand: {
          connect: {
            id: item.brandId,
          },
        },
        createdBy: {
          connect: {
            id: item.userId,
          },
        },
      },
    });
  });

  console.log('Successfully created items');

  //--------------------------------
  // BrandPost test data

  const brandPosts = dataFactory.getBrandPostSeed();
  brandPosts.forEach(async (brandPost: BrandPostEntity) => {
    await prisma.brandPost.upsert({
      where: { body: brandPost.body },
      update: {},
      create: {
        title: brandPost.title,
        body: brandPost.body,
        references: {
          createMany: {
            data: brandPost.references.map((reference) => ({
              ...reference,
            })),
          },
        },
        postScore: brandPost.postScore,
        createdAt: brandPost.createdAt,
        deletedAt: brandPost.deletedAt,
        brand: {
          connect: {
            id: brandPost.brandId,
          },
        },
        author: {
          connect: {
            id: brandPost.authorId,
          },
        },
        votes: {
          createMany: {
            data: brandPost.votes.map((vote) => ({
              vote: vote.vote,
              userId: vote.userId,
            })),
          },
        },
        topics: {
          createMany: {
            data: brandPost.topics.map((topic) => ({
              topicId: topic.topicId,
            })),
          },
        },
        reports: {
          createMany: {
            data: brandPost.reports.map((report) => ({
              reportId: report.id,
              reportReason: report.reportReason,
              resolvedAt: report.resolvedAt,
              resolvedById: report.resolvedById,
              authorId: report.authorId,
            })),
          },
        },
        relatedItems: {
          createMany: {
            data: brandPost.relatedItems.map((item) => ({
              itemId: item.itemId,
            })),
          },
        },
      },
    });
  });

  console.log('Successfully created brand posts');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await Promise.all([]);
    await prisma.$disconnect();
  });
