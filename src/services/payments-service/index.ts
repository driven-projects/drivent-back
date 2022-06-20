import paymentRepository, { CreatePaymentParams } from '@/repositories/payment-repository';

async function createPayment(params: CreatePaymentParams) {
  await paymentRepository.create(params);
}

const paymentsService = {
  createPayment,
};

export default paymentsService;
