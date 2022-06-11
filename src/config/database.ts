import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import dayjs from 'dayjs';

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

export async function initRedis(): Promise<void> {
  await redis.connect();

  const events = redis.get('events');
  if (!events) {
    const data = {
      title: 'Driven.t',
      logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
      backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(21, 'days').toDate(),
    };

    redis.set('events', JSON.stringify(data));
  }
}
