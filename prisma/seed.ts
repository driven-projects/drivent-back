import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

const mockedHotels1 = {
  name: 'Driven Resort',
  imageUrl: 'https://i.imgur.com/TkKjHEN.png',
};

const mockedHotels2 = {
  name: 'Driven Palace',
  imageUrl: 'https://i.imgur.com/OL1V1ud.png',
};

const mockedHotels3 = {
  name: 'Driven World',
  imageUrl: 'https://i.imgur.com/0EmyUAW.png',
};

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  await prisma.hotel.upsert({
    where: {
      name: mockedHotels1.name,
    },
    update: mockedHotels1,
    create: mockedHotels1,
  });

  await prisma.hotel.upsert({
    where: {
      name: mockedHotels2.name,
    },
    update: mockedHotels2,
    create: mockedHotels2,
  });

  await prisma.hotel.upsert({
    where: {
      name: mockedHotels3.name,
    },
    update: mockedHotels3,
    create: mockedHotels3,
  });

  await prisma.accomodationsType.upsert({
    where: {
      type: 'single',
    },
    update: { type: 'single' },
    create: { type: 'single' },
  });

  await prisma.accomodationsType.upsert({
    where: {
      type: 'double',
    },
    update: { type: 'double' },
    create: { type: 'double' },
  });

  await prisma.accomodationsType.upsert({
    where: {
      type: 'triple',
    },
    update: { type: 'triple' },
    create: { type: 'triple' },
  });

  const single = await prisma.accomodationsType.findUnique({ where: { type: 'single' } });
  const double = await prisma.accomodationsType.findUnique({ where: { type: 'double' } });
  const triple = await prisma.accomodationsType.findUnique({ where: { type: 'triple' } });

  const hotel1 = await prisma.hotel.findUnique({ where: { name: mockedHotels1.name } });
  const hotel2 = await prisma.hotel.findUnique({ where: { name: mockedHotels2.name } });
  const hotel3 = await prisma.hotel.findUnique({ where: { name: mockedHotels3.name } });

  await prisma.accomodationsHotel.createMany({
    data: [
      { hotelId: hotel1.id, accomodationsTypeId: single.id },
      { hotelId: hotel1.id, accomodationsTypeId: double.id },
      { hotelId: hotel2.id, accomodationsTypeId: single.id },
      { hotelId: hotel2.id, accomodationsTypeId: double.id },
      { hotelId: hotel2.id, accomodationsTypeId: triple.id },
      { hotelId: hotel3.id, accomodationsTypeId: single.id },
      { hotelId: hotel3.id, accomodationsTypeId: double.id },
    ],
  });

  await prisma.room.createMany({
    data: [
      { hotelId: hotel1.id, accomodationsTypeId: single.id },
      { hotelId: hotel1.id, accomodationsTypeId: single.id },
      { hotelId: hotel1.id, accomodationsTypeId: single.id },
      { hotelId: hotel1.id, accomodationsTypeId: single.id },
      { hotelId: hotel1.id, accomodationsTypeId: single.id },
      { hotelId: hotel1.id, accomodationsTypeId: double.id },
      { hotelId: hotel1.id, accomodationsTypeId: double.id },
      { hotelId: hotel1.id, accomodationsTypeId: double.id },
      { hotelId: hotel1.id, accomodationsTypeId: double.id },
      { hotelId: hotel1.id, accomodationsTypeId: double.id },
      { hotelId: hotel1.id, accomodationsTypeId: double.id },
      { hotelId: hotel2.id, accomodationsTypeId: single.id },
      { hotelId: hotel2.id, accomodationsTypeId: single.id },
      { hotelId: hotel2.id, accomodationsTypeId: single.id },
      { hotelId: hotel2.id, accomodationsTypeId: single.id },
      { hotelId: hotel2.id, accomodationsTypeId: double.id },
      { hotelId: hotel2.id, accomodationsTypeId: double.id },
      { hotelId: hotel2.id, accomodationsTypeId: double.id },
      { hotelId: hotel2.id, accomodationsTypeId: double.id },
      { hotelId: hotel2.id, accomodationsTypeId: triple.id },
      { hotelId: hotel2.id, accomodationsTypeId: triple.id },
      { hotelId: hotel2.id, accomodationsTypeId: triple.id },
      { hotelId: hotel2.id, accomodationsTypeId: triple.id },
      { hotelId: hotel2.id, accomodationsTypeId: triple.id },
      { hotelId: hotel3.id, accomodationsTypeId: single.id },
      { hotelId: hotel3.id, accomodationsTypeId: single.id },
      { hotelId: hotel3.id, accomodationsTypeId: double.id },
      { hotelId: hotel3.id, accomodationsTypeId: double.id },
    ],
  });

  const rooms = await prisma.room.findMany();

  rooms.forEach(async (room) => {
    switch (room.accomodationsTypeId) {
      case single.id:
        await prisma.bed.createMany({
          data: [{ roomId: room.id }],
        });
        break;

      case double.id:
        await prisma.bed.createMany({
          data: [{ roomId: room.id }, { roomId: room.id }],
        });
        break;

      case triple.id:
        await prisma.bed.createMany({
          data: [{ roomId: room.id }, { roomId: room.id }, { roomId: room.id }],
        });
        break;

      default:
        break;
    }
  });

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
