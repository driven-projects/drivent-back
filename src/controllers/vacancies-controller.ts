import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';
import { findVacancyByUser, updateVacancy } from '@/services/vacancies-service';

export async function patchVacancy(req: AuthenticatedRequest, res: Response) {
  const data = req.body;

  await updateVacancy(data);
  res.sendStatus(httpStatus.OK);
}

export async function findVacancy(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const vacancy = await findVacancyByUser(userId);
  res.send(vacancy).status(httpStatus.OK);
}
