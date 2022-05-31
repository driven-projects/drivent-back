import { prisma } from '@/config';

async function findAllByEventUniqueId(id: number) {
  return await prisma.eventTicket.findMany({
    where: {
      eventId: id,
    },
    select: {
      id: true,
      price: true,
      name: true,
      hotelPrice: true,
      Ticket: {
        select: {
          isVirtual: true,
          description: true,
        },
      },
    },
  });
}

const ticketRepository = {
  findAllByEventUniqueId,
};

export default ticketRepository;
