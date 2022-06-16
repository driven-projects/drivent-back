import { prisma } from '@/config';

async function findAllActivities() {
  return prisma.activity.findMany();
}

const activityRepository = {
  findAllActivities,
};

export default activityRepository;
