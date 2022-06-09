import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

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

  await prisma.hotels.createMany({
    data: [
      {
        name: 'Driven Resort',
        image:
          'https://viagemeturismo.abril.com.br/wp-content/uploads/2015/12/188153847.jpg?quality=70&strip=info&w=1024&resize=1200,800',
      },
      {
        name: 'Driven Palace',
        image:
          'https://viagemeturismo.abril.com.br/wp-content/uploads/2016/10/copacabana-palace.jpeg?quality=70&strip=info&w=1024&resize=1200,800',
      },
      {
        name: 'Driven World',
        image:
          'https://www.agoda.com/wp-content/uploads/2019/02/Best-luxury-hotels-in-Seoul-South-Korea-Lotte-Hotel-World-4.jpg',
      },
    ],
  });

  for (let i = 0; i < 16; i++) {
    await prisma.bedrooms.create({
      data: {
        number: i + 1,
        hotelId: 1,
        type: 'SINGLE',
      },
    });
  }

  for (let i = 0; i < 16; i++) {
    await prisma.bedrooms.create({
      data: {
        number: i + 1,
        hotelId: 2,
        type: 'DOUBLE',
      },
    });
  }

  for (let i = 0; i < 16; i++) {
    await prisma.bedrooms.create({
      data: {
        number: i + 1,
        hotelId: 3,
        type: 'TRIPLE',
      },
    });
  }

  await prisma.vacancies.createMany({
    data: [],
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
