import { prisma } from '@/config';

async function findAllActivities() {
  return prisma.activity.findMany();
}
async function seatsByActivityAndLocationId(activityId: number, locationId: number) {
  return prisma.seat.findMany({
    where: {
      enrollmentId: null,
      activityId,
      locationId,
    },
  });
}
const activityRepository = {
  findAllActivities,
  seatsByActivityAndLocationId,
};

export default activityRepository;
