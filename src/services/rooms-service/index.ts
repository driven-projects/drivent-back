import { conflictError, notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import { bed } from '@prisma/client';

async function findRoom(id: number) {
  const room = await roomRepository.findRoomById(id);

  return room;
}

function verifyBeds(beds: bed[]): bed[] {
  const bedsAvailable = beds.filter((data) => !data.enrollmentId);

  if (bedsAvailable.length === 0) throw conflictError('This room has no beds available');

  return bedsAvailable;
}

async function verifyEnrollment(id: number) {
  const enrollment = await enrollmentRepository.findById(id);

  if (!enrollment) throw notFoundError();
}

async function selectBed(bed: bed, enrollmentId: number) {
  await roomRepository.selectBed(bed.id, enrollmentId);
}

async function findEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  return enrollment;
}
async function deleteBedRental(roomId: number, enrollmentId: number) {
  verifyEnrollment(enrollmentId);
  await roomRepository.deleteRentalBedByRoomAndEnrollmentId(roomId, enrollmentId);
}

async function verifyRoomByEnrollment(enrollmentId: number) {
  const bed = await roomRepository.findRoomByEnrollment(enrollmentId);

  if (!bed) throw notFoundError();

  return bed;
}
const roomsService = {
  findRoom,
  verifyBeds,
  selectBed,
  verifyEnrollment,
  findEnrollment,
  verifyRoomByEnrollment,
  deleteBedRental,
};

export default roomsService;
