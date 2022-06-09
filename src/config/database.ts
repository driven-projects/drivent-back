import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';

export let prisma: PrismaClient;
export function connectDb(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}

export const redis = createClient({
  url: process.env.REDIS_URL,
});

export async function connectRedis(): Promise<void> {
  await redis.connect();
}
