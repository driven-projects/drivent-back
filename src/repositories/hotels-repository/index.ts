import { prisma, redis } from '@/config';

async function getHotels() {
  const cachedHotels = await redis.get('hotels');
  if (!cachedHotels) {
    const hotels = await prisma.hotels.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        Bedrooms: { select: { id: true, number: true, type: true, Vacancy: true } },
      },
    });

    await redis.set('hotels', JSON.stringify(hotels), { EX: 300000 });

    return hotels;
  }

  return JSON.parse(cachedHotels);
}

async function getVacancies(hotelId: number) {
  return await prisma.vacancies.count({
    where: { hotelId },
    select: {
      _all: true,
      userId: true,
    },
  });
}

const hotelsRepository = {
  getHotels,
  getVacancies,
};

export default hotelsRepository;
