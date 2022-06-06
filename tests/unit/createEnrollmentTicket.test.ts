import { jest } from '@jest/globals';
import enrollmentTicketRepository from '../../src/repositories/enrollment-ticket-repository';
import enrollmentRepository from '../../src/repositories/enrollment-repository';
import eventTicketsRepository from '../../src/repositories/event-ticket-repository';
import enrollmentTicketService from '../../src/services/enrollment-ticket-service';
import { conflictError, notFoundError } from '@/errors';

describe('Create EnrollmentTicket', () => {
  it('should throw a 409 error given that the user already has a ticket', async () => {
    const date = Date.now() as any;

    jest.spyOn(enrollmentRepository, 'findEnrollmentByUserId').mockResolvedValue({
      id: 1,
      name: 'test',
      cpf: '1234567890',
      birthday: date,
      phone: '12345678',
      userId: 1,
      createdAt: date,
      updatedAt: date,
    });

    jest.spyOn(eventTicketsRepository, 'findEventTicketById').mockResolvedValue({
      id: 1,
      eventId: 1,
      ticketId: 1,
      price: 10,
      name: 'test',
    });

    jest.spyOn(enrollmentTicketRepository, 'findEnrollmentTicket').mockResolvedValue({
      id: 1,
      enrollmentId: 1,
      eventTicketId: 1,
      roomId: null,
      withHotel: true,
    });

    expect(async () => {
      await enrollmentTicketService.createEnrollmentTicket({
        userId: 1,
        withHotel: true,
        eventTicketId: 1,
      });
    }).rejects.toEqual(conflictError('Usuário já possui um ticket'));
  });

  it('should throw a not found error given that event ticket is null', async () => {
    const date = Date.now() as any;

    jest.spyOn(enrollmentRepository, 'findEnrollmentByUserId').mockResolvedValue({
      id: 1,
      name: 'test',
      cpf: '1234567890',
      birthday: date,
      phone: '12345678',
      userId: 1,
      createdAt: date,
      updatedAt: date,
    });

    jest.spyOn(eventTicketsRepository, 'findEventTicketById').mockResolvedValue(null);

    expect(async () => {
      await enrollmentTicketService.createEnrollmentTicket({
        userId: 1,
        withHotel: true,
        eventTicketId: 1,
      });
    }).rejects.toEqual(notFoundError());
  });
});
