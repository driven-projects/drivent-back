import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.enrollmentTicket.deleteMany({});
  await prisma.address.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.eventTicket.deleteMany({});
  await prisma.ticket.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}

export async function findFirstEventTicket() {
  return prisma.eventTicket.findFirst({
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
