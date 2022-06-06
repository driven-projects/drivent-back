import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import enrollmentTicket from '@/services/enrollment-ticket-service';

export async function postEnrollmentTicket(req: AuthenticatedRequest, res: Response) {
  const { userId, body } = req;

  const response = await enrollmentTicket.createEnrollmentTicket({ ...body, userId });

  return res.status(httpStatus.CREATED).send(response);
}
