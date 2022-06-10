import hotelsRepository from '@/repositories/hotels-repository';

export async function getHotelsInfo() {
  const hotels = await hotelsRepository.getHotels();
  const hotelData: unknown[] = [];

  for (const hotel of hotels) {
    const vacancy = await hotelsRepository.getVacancies(hotel.id);
    const hotelInfo = {
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      bedrooms: hotel.Bedrooms,
      vacancy,
    };
    hotelData.push(hotelInfo);
  }

  return hotelData;
}

// const hotelsService = {
//   getHotelsInfo,
// };

// export default hotelsService;
