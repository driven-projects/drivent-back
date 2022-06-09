import { prisma, redis } from '@/config';

async function getHotels() {
  const cachedHotels = await redis.get('hotels');
  if (!cachedHotels) {
    const hotels = await prisma.hotels.findMany();

    await redis.set('hotels', JSON.stringify(hotels), { EX: 300000 });

    return hotels;
  }

  return JSON.parse(cachedHotels);
}

const hotelsRepository = {
  getHotels,
};

export default hotelsRepository;
