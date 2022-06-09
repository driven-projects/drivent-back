import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { ticketData } from '@prisma/client';
import { Response } from 'express';
import httpStatus from 'http-status';

export type ticketInfo = Omit<ticketData, 'id'>;

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const ticketData: Omit<ticketInfo, 'userId'> = req.body;
  const { userId } = req;

  await paymentsService.create({ ...ticketData, userId });
  return res.sendStatus(httpStatus.OK);
}
