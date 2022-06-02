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
      Ticket: {
        select: {
          isVirtual: true,
          description: true,
        },
      },
      Event: {
        select: {
          hotelPrice: true,
        },
      },
    },
  });
}

const ticketRepository = {
  findAllByEventUniqueId,
};

export default ticketRepository;
