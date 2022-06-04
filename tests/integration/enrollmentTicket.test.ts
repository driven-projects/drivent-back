import app, { init } from '@/app';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { createEnrollmentWithAddress, createEvent, createUser } from '../factories';
import { createAllTicketsModel, createEventTickets } from '../factories/ticket-factory';
import { cleanDb, findFirstEventTicket, generateValidToken } from '../helpers';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /enrollment-tickets', () => {
  it('it should give a 201 status given valid token and body', async () => {
    const event = await createEvent();
    const user = await createUser();
    const token = await generateValidToken(user);

    const { id: enrollmentId } = await createEnrollmentWithAddress(user);

    const ticket = await createAllTicketsModel();

    await createEventTickets(event.id, ticket.id);
    const eventTickets = await findFirstEventTicket();

    const body = {
      withHotel: true,
      eventTicketId: eventTickets.id,
    };

    const response = await server.post(`/enrollment-tickets`).set('Authorization', `Bearer ${token}`).send(body);

    expect(response.status).toBe(httpStatus.CREATED);

    expect(response.body).toEqual({
      id: 1,
      enrollmentId,
      eventTicketId: eventTickets.id,
      roomId: null,
      withHotel: true,
      EventTicket: {
        price: eventTickets.price,
        Event: { hotelPrice: event.hotelPrice },
        Ticket: { description: ticket.description },
      },
    });
  });
});
