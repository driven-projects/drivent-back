import { prisma } from '@/config';

async function findRoomById(id: number) {
  const room = await prisma.room.findFirst({
    where: {
      id,
    },
    include: {
      bed: true,
    },
  });
  return room;
}

async function findRoomByEnrollment(enrollmentId: number) {
  const bed = await prisma.bed.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      room: {
        include: {
          hotel: true,
          accomodationsType: true,
          bed: true,
        },
      },
    },
  });
  return bed;
}

async function selectBed(bedId: number, enrollmentId: number) {
  await prisma.bed.update({
    where: {
      id: bedId,
    },
    data: {
      enrollmentId,
    },
  });
}

async function deleteRentalBedByRoomAndEnrollmentId(roomId: number, enrollmentId: number) {
  await prisma.bed.updateMany({
    where: {
      roomId,
      enrollmentId,
    },
    data: {
      enrollmentId: null,
    },
  });
}

const roomRepository = {
  findRoomById,
  selectBed,
  findRoomByEnrollment,
  deleteRentalBedByRoomAndEnrollmentId,
};

export default roomRepository;
