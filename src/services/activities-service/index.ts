import { conflictError, notFoundError } from '@/errors';
import activityRepository from '@/repositories/activity-repository';
import { activity } from '@prisma/client';
import dayjs from 'dayjs';

async function getAllActivities(): Promise<activity[]> {
  const activities = await activityRepository.findAllActivities();
  return activities;
}

async function seatsByActivityAndLocationId(activityId: number, locationId: number) {
  const activities = await activityRepository.seatsByActivityAndLocationId(activityId, locationId);
  return activities;
}

async function seatsByEnrollmentId(enrollmentId: number) {
  const seats = await activityRepository.seatsByEnrollmentId(enrollmentId);
  return seats;
}

async function newSubscriptionSeat(activityId: number, locationId: number, enrollmentId: number) {
  const seat = await activityRepository.findFirstSeat(activityId, locationId);
  if (!seat) throw notFoundError();

  await checkThereIsConflictOrNot(enrollmentId, activityId);

  await activityRepository.updateSeat(enrollmentId, seat.id);
}

const activitiesService = {
  getAllActivities,
  seatsByActivityAndLocationId,
  newSubscriptionSeat,
  seatsByEnrollmentId,
};

export default activitiesService;

async function checkThereIsConflictOrNot(enrollmentId: number, activityWantedId: number) {
  const seatsByUser = await activityRepository.findSeatsByEnrollmentId(enrollmentId);
  const activitiesIdByUserOnSystem: number[] = [];

  seatsByUser.forEach((seat) => {
    activitiesIdByUserOnSystem.push(seat.activityId);
  });

  if (activitiesIdByUserOnSystem.length) {
    const activitiesByUser = [];
    for (let i = 0; i < activitiesIdByUserOnSystem.length; i++) {
      const activityId = activitiesIdByUserOnSystem[i];
      const activity = await activityRepository.findFirstActivityById(activityId);
      activitiesByUser.push(activity);
    }

    const activityWanted = await activityRepository.findFirstActivityById(activityWantedId);
    if (!activityWanted) throw notFoundError();
    const dateWanted = dayjs(activityWanted.date);
    const timeWantedInit = dayjs(activityWanted.startTime);
    const timeWantedEnd = dayjs(activityWanted.endTime);

    activitiesByUser.map((act) => {
      const dateSystem = dayjs(act.date);
      const startTime = dayjs(act.startTime);
      const endTime = dayjs(act.endTime);

      const datediff = dateWanted.diff(dateSystem);
      if (!datediff) {
        if (timeWantedInit.isAfter(startTime) && timeWantedInit.isBefore(endTime))
          throw conflictError('conflito de horario');
        if (!timeWantedInit.diff(startTime) || !timeWantedInit.diff(endTime))
          throw conflictError('conflito de horario');

        if (timeWantedEnd.isAfter(startTime) && timeWantedEnd.isBefore(endTime))
          throw conflictError('conflito de horario');
        if (!timeWantedEnd.diff(startTime) || !timeWantedEnd.diff(endTime)) throw conflictError('conflito de horario');
      }
    });
  }
}
