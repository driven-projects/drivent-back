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
  let tickets = await prisma.ticket.findFirst();
  if (!tickets) {
     await prisma.ticket.create({
      data: {
        isVirtual: false,
        description : "Presencial"
      },
    });
    
     await prisma.ticket.create({
      data: {
        isVirtual: true,
        description : "Online"
      },
    });
  }
  let eventTicket = await prisma.eventTicket.findFirst()
  if(!eventTicket) {
    await prisma.eventTicket.create({
      data : {
        eventId : 1,
        ticketId : 1,
        price : 250,
        name : null,
        hotelPrice : 350
      }
    })
    await prisma.eventTicket.create({
      data : {
        eventId : 1,
        ticketId : 2,
        price : 100,
        name : null,
        hotelPrice : 0
      }
    })
  }

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
