import { prisma } from '@/config';
import { ticketInfo } from '@/controllers/payments-controller';

async function create(data: ticketInfo) {
  await prisma.ticketData.create({
    data,
  });
}

async function get(userId: number) {
  return prisma.ticketData.findUnique({
    where: {
      userId: userId,
    },
  });
}

const paymentsRepository = {
  create,
  get,
};

export default paymentsRepository;
