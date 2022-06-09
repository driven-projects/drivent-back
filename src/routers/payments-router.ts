import { Router } from 'express';
import { createTicket, getPayment } from '@/controllers/payments-controller';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.post('/', createTicket);
paymentsRouter.get('/', authenticateToken, getPayment);

export { paymentsRouter };
