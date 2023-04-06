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

  let twemp = await Promise.all(userIds);
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
};

// --------------------------------
// Brand test data

let brands = dataFactory.getBrandList();
brands.forEach(async (brand) => {
	await prisma.brand.upsert({
		where: { name: brand.name },
		update: {},
		create: {
			name: brand.name,
		},
	});
});


main();

// .catch((e) => {
// 	console.error(e);
// 	process.exit(1);
// })
// .finally(async () => {
// 	await Promise.all([]);
// 	await prisma.$disconnect();
// });
