import { ticketInfo } from '@/controllers/payments-controller';
import { notFoundError } from '@/errors';
import paymentsRepository from '@/repositories/payments-repository';

export async function create(ticket: ticketInfo) {
  await paymentsRepository.create(ticket);
}

async function get(id: number) {
  const payment = await paymentsRepository.get(id);

  if (!payment) throw notFoundError();

  return payment;
}

const paymentsService = {
  create,
  get,
};

// export default paymentsService;
