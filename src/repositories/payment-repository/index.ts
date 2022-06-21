import { prisma } from '@/config';
import { Payment } from '@prisma/client';

async function create(createPaymentData: CreatePaymentParams) {
  return await prisma.payment.create({
    data: createPaymentData,
  });
}

export type CreatePaymentParams = Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>;

const paymentRepository = {
  create,
};

export default paymentRepository;
