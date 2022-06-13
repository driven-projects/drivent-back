import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';
import { updateVacancy } from '@/services/vacancies-service';

export async function patchVacancy(req: AuthenticatedRequest, res: Response) {
  const data = req.body;

  await updateVacancy(data);
  res.sendStatus(httpStatus.OK);
}
