import { CreatePaymentParams } from '@/repositories/payment-repository';
import Joi from 'joi';

export const createPaymentSchema = Joi.object<CreatePaymentParams>({
  enrollmentId: Joi.number().required(),
  ticketModality: Joi.string().required(),
  ticketAccomodation: Joi.boolean().required(),
  ticketValue: Joi.string().required(),
});
