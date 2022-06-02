import { prisma } from '@/config';
import { ticketInfo } from '@/controllers/payments-controller';

async function create(data: ticketInfo) {
  await prisma.ticketData.create({
    data,
  });
}

const paymentsRepository = {
  create,
};

export default paymentsRepository;
