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

const activitiesService = {
  getAllActivities,
  seatsByActivityAndLocationId,
};

export default activitiesService;
