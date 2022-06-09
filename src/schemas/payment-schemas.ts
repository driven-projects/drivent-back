import { CreatePaymentParams } from '@/repositories/payment-repository';
import Joi from 'joi';

const expireDateValidationSchema = Joi.string().length(7).custom(joiExpireDateValidation).required();

export const createPaymentSchema = Joi.object<CreatePaymentParams>({
  enrollmentId: Joi.number().required(),
  ticketModality: Joi.string().required(),
  ticketAccomodation: Joi.boolean().required(),
  name: Joi.string().min(3).required(),
  cardNumber: Joi.string().length(16).required(),
  expireDate: expireDateValidationSchema,
  cvc: Joi.string().length(3).required(),
});

function joiExpireDateValidation(value: string, helpers: Joi.CustomHelpers<string>) {
  const today = new Date();

  if (!value) return value;

  if (parseInt(value.split('/')[0]) >= 12 && parseInt(value.split('/')[1]) <= today.getFullYear()) {
    return helpers.error('any.invalid');
  }

  return value;
}
