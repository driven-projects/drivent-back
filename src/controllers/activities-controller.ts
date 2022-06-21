import activitiesService from '@/services/activities-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getActivities(_req: Request, res: Response) {
  const activities = await activitiesService.getAllActivities();

  return res.status(httpStatus.OK).send(activities);
}
export async function seatsByActivityAndLocationId(req: Request, res: Response) {
  const { activityId, locationId } = req.body;
  const seats = await activitiesService.seatsByActivityAndLocationId(activityId, locationId);
  return res.status(httpStatus.OK).send(seats);
}

export async function seatsByEnrollmentId(req: Request, res: Response) {
  const { enrollmentId } = req.body;
  const seats = await activitiesService.seatsByEnrollmentId(enrollmentId);
  return res.status(httpStatus.OK).send(seats);
}
export async function newSubscriptionSeat(req: Request, res: Response) {
  const { activityId, locationId, enrollmentId } = req.body;

  await activitiesService.newSubscriptionSeat(activityId, locationId, enrollmentId);

  return res.sendStatus(httpStatus.OK);
}
