import { prisma } from '@/config';

export async function createAllTicketsModel() {
  return await prisma.ticket.create({
    data: {
      isVirtual: false,
      description: 'Presencial',
    },
  });
}

export async function createEventTickets(eventId: number, ticketId: number) {
  return await prisma.eventTicket.create({
    data: {
      eventId: eventId,
      ticketId,
      price: 250,
      name: null,
    },
  });
}
