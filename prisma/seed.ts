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

  const hotel = await prisma.hotels.findFirst();
  if (!hotel) {
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
  }

  const hotels = await prisma.hotels.findMany();
  const bedrooms = await prisma.bedrooms.findMany();
  if (!bedrooms) {
    for (let i = 0; i < 16; i++) {
      await prisma.bedrooms.create({
        data: {
          number: i + 1,
          hotelId: hotels[0].id,
          type: 'SINGLE',
        },
      });

      await prisma.bedrooms.create({
        data: {
          number: i + 1,
          hotelId: hotels[1].id,
          type: 'DOUBLE',
        },
      });

      await prisma.bedrooms.create({
        data: {
          number: i + 1,
          hotelId: hotels[2].id,
          type: 'TRIPLE',
        },
      });
    }
  }

  const vacancy = await prisma.vacancies.findMany();
  if (vacancy.length === 0) {
    for (let i = 0; i < bedrooms.length; i++) {
      if (bedrooms[i].type === 'SINGLE') {
        await prisma.vacancies.create({
          data: { isAvailable: false, bedroomId: bedrooms[i].id },
        });
      }

      if (bedrooms[i].type === 'DOUBLE') {
        await prisma.vacancies.create({
          data: { isAvailable: false, bedroomId: bedrooms[i].id },
        });

        await prisma.vacancies.create({
          data: { isAvailable: false, bedroomId: bedrooms[i].id },
        });
      }

      if (bedrooms[i].type === 'TRIPLE') {
        await prisma.vacancies.create({
          data: { isAvailable: false, bedroomId: bedrooms[i].id },
        });

        await prisma.vacancies.create({
          data: { isAvailable: false, bedroomId: bedrooms[i].id },
        });

        await prisma.vacancies.create({
          data: { isAvailable: false, bedroomId: bedrooms[i].id },
        });
      }
    }
  }

  console.log({ event, bedrooms, vacancy });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
