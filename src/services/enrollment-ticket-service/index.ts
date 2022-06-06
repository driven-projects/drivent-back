import enrollmentRepository from '@/repositories/enrollment-repository';
import { conflictError, notFoundError } from '@/errors';
import eventTicketsRepository from '@/repositories/event-ticket-repository';
import enrollmentTicketRepository from '@/repositories/enrollment-ticket-repository';

interface createEnrollmentTicket {
  userId: number;
  withHotel: boolean;
  eventTicketId: number;
}

export async function createEnrollmentTicket(enrollmentTicketData: createEnrollmentTicket) {
  const { userId, withHotel, eventTicketId } = enrollmentTicketData;

  const enrollmentExists = await enrollmentRepository.findEnrollmentByUserId(userId);
  if (!enrollmentExists) throw notFoundError();

  const eventTicketExists = await eventTicketsRepository.findEventTicketById(eventTicketId);
  if (!eventTicketExists) throw notFoundError();

  const enrollmentTicketExists = await enrollmentTicketRepository.findEnrollmentTicket(enrollmentExists.id);
  if (enrollmentTicketExists) throw conflictError('Usuário já possui um ticket');

  const enrollmentTicket = await enrollmentTicketRepository.createEnrollmentTicket({
    enrollmentId: enrollmentExists.id,
    eventTicketId: eventTicketExists.id,
    withHotel,
  });

  return enrollmentTicket;
}

const enrollmentTicket = {
  createEnrollmentTicket,
};

export default enrollmentTicket;
