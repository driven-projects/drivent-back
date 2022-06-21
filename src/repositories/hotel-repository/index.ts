import { prisma } from '@/config';

async function findAllHotels() {
  return prisma.hotel.findMany({
    include: { room: { include: { bed: true } }, accomodationsHotel: { include: { accomodationsType: true } } },
  });
}

const hotelRepository = {
  findAllHotels,
};

export default hotelRepository;
