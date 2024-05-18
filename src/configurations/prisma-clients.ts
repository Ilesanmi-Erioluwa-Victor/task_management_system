import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient({
  log: ['info', 'warn', 'error'],
  errorFormat: 'minimal',
});
export default prisma;
