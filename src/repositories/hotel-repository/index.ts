import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function findAllHotels() {
  return prisma.hotel.findMany({
    include: { room: { include: { bed: true } }, accomodationsHotel: { include: { accomodationsType: true } } },
  });
}

const hotelRepository = {
  findAllHotels,
};

export default hotelRepository;
