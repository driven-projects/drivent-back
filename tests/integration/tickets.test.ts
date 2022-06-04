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

describe('GET /tickets', () => {
  it('it should give a ticket body given valid token and enrollment', async () => {
    const user = await createUser();
    const token = await generateValidToken(user);
    await createEnrollmentWithAddress(user);
    const event = await createEvent();
    const ticket = await createAllTicketsModel();
    await createEventTickets(event.id, ticket.id);
    const eventTickets = await findFirstEventTicket();
    const response = await server.get(`/tickets/${event.id}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body[0]).toEqual({
      id: eventTickets.id,
      price: eventTickets.price,
      name: eventTickets.name,
      Ticket: {
        isVirtual: eventTickets.Ticket.isVirtual,
        description: eventTickets.Ticket.description,
      },
      Event: {
        hotelPrice: eventTickets.Event.hotelPrice,
      },
    });
  });
});
