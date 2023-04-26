import { PrismaClient } from '@prisma/client';
import { DataFactory } from './data/DataFactory';
import { UserEntity } from 'src/user/entities/user.entity';
import e from 'express';

export const prisma = new PrismaClient();
const dataFactory: DataFactory = DataFactory.getInstance();

export const main = async () => {
  console.log('Seeding database...');

  // ----------------------------
  // User Role test data

  let userR = dataFactory.getBasicUserRole();
  let adminR = dataFactory.getAdminUserRole();
  let userRole = await prisma.userRole.upsert({
    where: {
      name: userR.name,
    },
    update: {},
    create: {
      name: userR.name,
    },
  });
  let adminRole = await prisma.userRole.upsert({
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

  let users = dataFactory.getUserListSeed();
  let res1 = users.map(async (user: UserEntity) => {
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
  let lastThreeUsers = await Promise.all(res1.slice(-3));
  let userIds = lastThreeUsers.map((user) => {
    return user.id;
  });

  await prisma.userRole.upsert({
    where: { id: adminRole.id },
    update: {},
    create: {
      users: {
        createMany: {
          data: userIds.map((id) => ({
            userId: id,
          })),
        },
      },
    },
  });
  let roles = [userRole, adminRole];
  let user = await dataFactory.getValidUser();
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

  await Promise.all(res1);

  console.log('User data seed success!');

  // --------------------------------
  // Email Template test data

  let emailTemplates = dataFactory.getEmailTemplateList();
  emailTemplates.forEach(async (emailTemplate) => {
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
  });

  console.log('Successfully created email templates');

  // --------------------------------
  // Brand test data

  await Promise.all(res1);
  let brands = dataFactory.getBrandsSeed();
  brands.forEach(async (brand) => {
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

  let topics = dataFactory.getTopicsSeed();
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

let items = dataFactory.getItemSeed();
items.forEach(async (item) => {
  await prisma.item.upsert({
    where: { name: item.name },
    update: {},
    create: {
      name: item.name,
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

let brandPosts = dataFactory.getBrandPostSeed();
brandPosts.forEach(async (brandPost) => {
  await prisma.brandPost.upsert({
    where: { body: brandPost.body },
    update: {},
    create: {
      body: brandPost.body,
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
},
});
});

console.log('Successfully created brand posts');

};

main();



// .catch((e) => {
// 	console.error(e);
// 	process.exit(1);
// })
// .finally(async () => {
// 	await Promise.all([]);
// 	await prisma.$disconnect();
// });
