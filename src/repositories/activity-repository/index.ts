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
async function findFirstSeat(activityId: number, locationId: number) {
  return prisma.seat.findFirst({
    where: {
      activityId,
      locationId,
    },
  });
}

async function updateSeat(enrollmentId: number, seatId: number) {
  return prisma.seat.update({
    where: {
      id: seatId,
    },
    data: {
      enrollmentId,
    },
  });
}

const activityRepository = {
  findAllActivities,
  seatsByActivityAndLocationId,
  findFirstSeat,
  updateSeat,
};

export default activityRepository;
