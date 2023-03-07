import { PrismaClient } from '@prisma/client';
import { DataFactory } from './data/DataFactory';

export const prisma = new PrismaClient();
const dataFactory: DataFactory = DataFactory.getInstance();

export const main = async () => {
  console.log(`Start seeding ...`);
};
