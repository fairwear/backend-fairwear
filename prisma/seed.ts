import { PrismaClient } from '@prisma/client';
import { DataFactory } from './data/DataFactory';

export const prisma = new PrismaClient();
const dataFactory: DataFactory = DataFactory.getInstance();

export const main = async () => {
  console.log('Seeding database...');
  const emailTemplate = dataFactory.getValidEmailTemplate();
  await prisma.emailTemplate.create({
    data: emailTemplate,
  });
  console.log('Created email templates');
};
