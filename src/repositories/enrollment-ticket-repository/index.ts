import { prisma } from '@/config';
import { EnrollmentTicket } from '@prisma/client';

type CreateEnrollmentTicket = Omit<EnrollmentTicket, 'id' | 'roomId'>;

async function createEnrollmentTicket({ enrollmentId, eventTicketId, withHotel }: CreateEnrollmentTicket) {
  return prisma.enrollmentTicket.create({
    data: {
      enrollmentId,
      eventTicketId,
      withHotel,
      roomId: null,
    },
    include: {
      EventTicket: {
        select: {
          price: true,
          Event: {
            select: {
              hotelPrice: true,
            },
          },
          Ticket: {
            select: {
              description: true,
            },
          },
        },
      },
    },
  });
}

async function findEnrollmentTicket(enrollmentId: number) {
  return prisma.enrollmentTicket.findFirst({
    where: {
      enrollmentId,
    },
  });
}

const enrollmentTicketRepository = {
  createEnrollmentTicket,
  findEnrollmentTicket,
};

export default enrollmentTicketRepository;
