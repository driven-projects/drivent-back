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
      { hotelId: hotel1?.id as number, accomodationsTypeId: single?.id  as number},
      { hotelId: hotel1?.id as number, accomodationsTypeId: double?.id  as number},
      { hotelId: hotel2?.id as number, accomodationsTypeId: single?.id  as number},
      { hotelId: hotel2?.id as number, accomodationsTypeId: double?.id  as number},
      { hotelId: hotel2?.id as number, accomodationsTypeId: triple?.id  as number},
      { hotelId: hotel3?.id as number, accomodationsTypeId: single?.id  as number},
      { hotelId: hotel3?.id as number, accomodationsTypeId: double?.id  as number},
    ],
    skipDuplicates: true,
  });

  await prisma.room.createMany({
    data: [
      { hotelId: hotel1?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel1?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: triple?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: triple?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: triple?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: triple?.id as number },
      { hotelId: hotel2?.id as number, accomodationsTypeId: triple?.id as number },
      { hotelId: hotel3?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel3?.id as number, accomodationsTypeId: single?.id as number },
      { hotelId: hotel3?.id as number, accomodationsTypeId: double?.id as number },
      { hotelId: hotel3?.id as number, accomodationsTypeId: double?.id as number },
    ],
    skipDuplicates: true,
  });

  const rooms = await prisma.room.findMany();

  rooms.forEach(async (room) => {
    switch (room.accomodationsTypeId) {
      case single?.id:
        await prisma.bed.createMany({
          data: [{ roomId: room.id }],
        });
        break;

      case double?.id:
        await prisma.bed.createMany({
          data: [{ roomId: room.id }, { roomId: room.id }],
        });
        break;

      case triple?.id:
        await prisma.bed.createMany({
          data: [{ roomId: room.id }, { roomId: room.id }, { roomId: room.id }],
        });
        break;

      default:
        break;
    }
  });

  await prisma.location.createMany({
    data: [
      { name: 'Auditório Principal' },
      { name: 'Auditório Lateral' }, 
      { name: 'Sala de Workshop' }
    ],
    skipDuplicates: true,

  });

  const location1 = await prisma.location.findFirst({ where: { name: 'Auditório Principal' } });
  const location2 = await prisma.location.findFirst({ where: { name: 'Auditório Lateral' } });
  const location3 = await prisma.location.findFirst({ where: { name: 'Sala de Workshop' } });

  //  "LoL: montando o PC ideal"
  // "Palestra: como jogar de suporte"
  //"Palestra: redstone? estruturando sua primeira lógica"
  //"Palestra: LoL, diversão ou vicio?"

  const time09 = dayjs().hour(9).toISOString();
  const time10 = dayjs().hour(10).toISOString();
  const time11 = dayjs().hour(11).toISOString();
  const time12 = dayjs().hour(12).toISOString();
  const time13 = dayjs().hour(13).toISOString();
  const time14 = dayjs().hour(14).toISOString();

  const mockActivity1 = {
    name: 'Minecraft: montando o PC ideal',
    date: dayjs('10/22/2022').toISOString(),
    startTime: time09,
    endTime: time10,
    locationId: location1?.id as number,
  };

  const mockActivity2 = {
    name: 'LoL: montando o PC ideal',
    date: dayjs('10/22/2022').toISOString(),
    startTime: time10,
    endTime: time11,
    locationId: location1?.id as number,
  };

  const mockActivity3 = {
    name: 'Palestra: como jogar de suporte',
    date: dayjs('10/22/2022').toISOString(),
    startTime: time09,
    endTime: time12,
    locationId: location2?.id as number,
  };
  const mockActivity4 = {
    name: 'Palestra: redstone? estruturando sua primeira lógica',
    date: dayjs('10/22/2022').toISOString(),
    startTime: time09,
    endTime: time11,
    locationId: location3?.id as number,
  };
  const mockActivity5 = {
    name: 'Palestra: LoL, diversão ou vicio?',
    date: dayjs('10/22/2022').toISOString(),
    startTime: time13,
    endTime: time14,
    locationId: location3?.id as number,
  };

  const mockActivity6 = {
    name: 'Minecraft: montando o PC ideal',
    date: dayjs('10/23/2022').toISOString(),
    startTime: time09,
    endTime: time10,
    locationId: location1?.id as number,
  };

  const mockActivity7 = {
    name: 'LoL: montando o PC ideal',
    date: dayjs('10/24/2022').toISOString(),
    startTime: time10,
    endTime: time11,
    locationId: location1?.id as number,
  };

  const mockActivity8 = {
    name: 'Palestra: como jogar de suporte',
    date: dayjs('10/24/2022').toISOString(),
    startTime: time09,
    endTime: time12,
    locationId: location2?.id as number,
  };
  const mockActivity9 = {
    name: 'Palestra: redstone? estruturando sua primeira lógica',
    date: dayjs('10/23/2022').toISOString(),
    startTime: time09,
    endTime: time11,
    locationId: location3?.id as number,
  };

  const activity1 = await prisma.activity.create({ data: mockActivity1});
  const activity2 = await prisma.activity.create({ data: mockActivity2});
  const activity3 = await prisma.activity.create({ data: mockActivity3});
  const activity4 = await prisma.activity.create({ data: mockActivity4});
  const activity5 = await prisma.activity.create({ data: mockActivity5});
  const activity6 = await prisma.activity.create({ data: mockActivity6});
  const activity7 = await prisma.activity.create({ data: mockActivity7});
  const activity8 = await prisma.activity.create({ data: mockActivity8});
  const activity9 = await prisma.activity.create({ data: mockActivity9});

  await prisma.seat.createMany({
    data: [
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },
      { activityId: activity1.id, locationId: activity1.locationId },

      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },
      { activityId: activity2.id, locationId: activity2.locationId },

      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },
      { activityId: activity3.id, locationId: activity3.locationId },

      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },
      { activityId: activity4.id, locationId: activity4.locationId },

      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },
      { activityId: activity5.id, locationId: activity5.locationId },

      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },
      { activityId: activity6.id, locationId: activity6.locationId },

      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },
      { activityId: activity7.id, locationId: activity7.locationId },

      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },
      { activityId: activity8.id, locationId: activity8.locationId },

      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
      { activityId: activity9.id, locationId: activity9.locationId },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
