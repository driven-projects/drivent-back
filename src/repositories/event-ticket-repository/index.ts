import { prisma } from '@/config';

async function findEventTicketById(id: number) {
  return prisma.eventTicket.findUnique({
    where: {
      id,
    },
  });
}

const eventTicketsRepository = {
  findEventTicketById,
};

export default eventTicketsRepository;
