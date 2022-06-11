import { redis } from '@/config';

async function findFirst() {
  const events = await redis.get('events');

  return JSON.parse(events);
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
