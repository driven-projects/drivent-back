import { prisma } from '@/config';

async function findAllActivities() {
  return prisma.activity.findMany();
}
async function findFirstActivityById(activityId: number) {
  return prisma.activity.findFirst({
    where: {
      id: activityId,
    },
  });
}
async function findSeatsByEnrollmentId(enrollmentId: number) {
  return prisma.seat.findMany({
    where: {
      enrollmentId,
    },
  });
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

async function seatsByEnrollmentId(enrollmentId: number) {
  return prisma.seat.findMany({
    where: {
      enrollmentId,
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
  findFirstActivityById,
  findSeatsByEnrollmentId,
  seatsByActivityAndLocationId,
  seatsByEnrollmentId,
  findFirstSeat,
  updateSeat,
};

export default activityRepository;
