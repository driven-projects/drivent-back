import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { postCreatePayment } from '@/controllers';
import { createPaymentSchema } from '@/schemas/payment-schemas';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).post('/', validateBody(createPaymentSchema), postCreatePayment);

export { paymentsRouter };
