import roomsService from '@/services/rooms-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function bookRoom(req: Request, res: Response) {
  const { id, enrollmentId } = req.body;

  const room = await roomsService.findRoom(id);

  roomsService.verifyEnrollment(enrollmentId);

  const bedsAvailable = roomsService.verifyBeds(room.bed);
  bedsAvailable.reverse();

  roomsService.selectBed(bedsAvailable[0], enrollmentId);

  return res.sendStatus(httpStatus.CREATED);
}

export async function findSelectedRoom(req: Request, res: Response) {
  const id = res.locals.userId;

  const enrollment = await roomsService.findEnrollment(id);

  const bed = await roomsService.verifyRoomByEnrollment(enrollment.id);

  return res.status(httpStatus.OK).send(bed);
}
