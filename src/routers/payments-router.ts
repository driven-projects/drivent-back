import { Router } from 'express';
import { createTicket } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter.post('/', createTicket);

export { paymentsRouter };
