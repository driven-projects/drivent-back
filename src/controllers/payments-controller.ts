import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { ticketData } from '@prisma/client';
import { Response } from 'express';
import httpStatus from 'http-status';

export type ticketInfo = Omit<ticketData, 'id'>;

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const ticketData: ticketInfo = req.body;

  await paymentsService.create(ticketData);
  return res.sendStatus(httpStatus.OK);
}
