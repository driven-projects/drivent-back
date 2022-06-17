import activityRepository from '@/repositories/activity-repository';
import { activity } from '@prisma/client';

async function getAllActivities(): Promise<activity[]> {
  const activities = await activityRepository.findAllActivities();
  return activities;
}

const activitiesService = {
  getAllActivities,
};

export default activitiesService;
