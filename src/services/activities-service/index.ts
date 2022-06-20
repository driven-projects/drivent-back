import { notFoundError } from '@/errors';
import activityRepository from '@/repositories/activity-repository';
import { activity } from '@prisma/client';

async function getAllActivities(): Promise<activity[]> {
  const activities = await activityRepository.findAllActivities();
  return activities;
}

async function seatsByActivityAndLocationId(activityId: number, locationId: number) {
  const activities = await activityRepository.seatsByActivityAndLocationId(activityId, locationId);
  return activities;
}
async function newSubscriptionSeat(activityId: number, locationId: number, enrollmentId: number) {
  const seat = await activityRepository.findFirstSeat(activityId, locationId);
  if (!seat) throw notFoundError();

  await activityRepository.updateSeat(enrollmentId, seat.id);
}

const activitiesService = {
  getAllActivities,
  seatsByActivityAndLocationId,
  newSubscriptionSeat,
};

export default activitiesService;
