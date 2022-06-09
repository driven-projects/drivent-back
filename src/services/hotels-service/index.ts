import hotelsRepository from '@/repositories/hotels-repository';

export async function getHotelsInfo() {
  const hotels = await hotelsRepository.getHotels();
  return hotels;
}

// const hotelsService = {
//   getHotelsInfo,
// };

// export default hotelsService;
