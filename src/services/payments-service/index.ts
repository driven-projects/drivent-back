import { ticketInfo } from '@/controllers/payments-controller';
import paymentsRepository from '@/repositories/payments-repository';

async function create(ticket: ticketInfo) {
  await paymentsRepository.create(ticket);
}

const paymentsService = {
  create,
};

export default paymentsService;
