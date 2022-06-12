import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import { redis } from '@/config';

export type Event = {
  title: string;
  logoImageUrl: string;
  backgroundImageUrl: string;
  startsAt: string | Date;
  endsAt: string | Date;
};

export async function createEvent(params: Partial<Event> = {}): Promise<Event> {
  const data = {
    title: params.title || faker.lorem.sentence(),
    backgroundImageUrl: params.backgroundImageUrl || faker.image.imageUrl(),
    logoImageUrl: params.logoImageUrl || faker.image.imageUrl(),
    startsAt: params.startsAt || dayjs().subtract(1, 'day').toDate(),
    endsAt: params.endsAt || dayjs().add(5, 'days').toDate(),
  };

  await redis.set('events', JSON.stringify(data));
  return data;
}
