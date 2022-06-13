import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { paymentsRouter } from './payments-router';
import { patchVacancy } from '@/controllers';

const vacanciesRouter = Router();

paymentsRouter.patch('/', authenticateToken, patchVacancy);

export { vacanciesRouter };
