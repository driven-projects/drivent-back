import { prisma } from '@/config';
import { CreateOrUpdateEnrollmentWithAddress } from '@/services';
import { Address, Enrollment } from '@prisma/client';
import { exclude } from '@/utils/prisma-utils';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

function getAddressForUpsert(address: CreateAddressParams) {
  return {
    ...address,
    ...(address?.addressDetail && { addressDetail: address.addressDetail }),
  };
}

async function upsertEnrollmentAndAddress(params: CreateOrUpdateEnrollmentWithAddress) {
  const enrollment: CreateEnrollmentParams = exclude(params, 'address');
  const address: CreateAddressParams | UpdateAddressParams = getAddressForUpsert(params.address);

  return await prisma.$transaction(async (prisma) => {
    const newEnrollment = await prisma.enrollment.upsert({
      where: {
        userId: params.userId,
      },
      create: enrollment,
      update: exclude(enrollment, 'userId'),
    });

    await prisma.address.upsert({
      where: {
        enrollmentId: newEnrollment.id,
      },
      create: {
        ...address,
        Enrollment: { connect: { id: newEnrollment.id } },
      },
      update: address,
    });
  });
}

export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;
export type CreateAddressParams = Omit<Address, 'id' | 'createdAt' | 'updatedAt' | 'enrollmentId'>;
export type UpdateAddressParams = CreateAddressParams;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsertEnrollmentAndAddress,
};

export default enrollmentRepository;
