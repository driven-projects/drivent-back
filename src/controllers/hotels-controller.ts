import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import httpStatus from 'http-status';
import * as hotelsService from '@/services/hotels-service';

export async function getHotelsInfo(req: AuthenticatedRequest, res: Response) {
  const hotels = await hotelsService.getHotelsInfo();
  return res.send(hotels).status(httpStatus.OK);
}
