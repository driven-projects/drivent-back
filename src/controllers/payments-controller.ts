import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function postCreatePayment(req: AuthenticatedRequest, res: Response) {
  await paymentsService.createPayment({
    ...req.body,
  });

  return res.sendStatus(httpStatus.OK);
}
