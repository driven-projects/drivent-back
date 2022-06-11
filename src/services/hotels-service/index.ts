import hotelRepository from '@/repositories/hotel-repository';
import { hotel } from '@prisma/client';

async function getAllHotels(): Promise<hotel[]> {
  const hotels = await hotelRepository.findAllHotels();
  return hotels;
}

const hotelsService = {
  getAllHotels,
};

export default hotelsService;
