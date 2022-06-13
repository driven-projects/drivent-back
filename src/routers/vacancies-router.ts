import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { findVacancy, patchVacancy } from '@/controllers';

const vacanciesRouter = Router();

vacanciesRouter.patch('/', authenticateToken, patchVacancy);
vacanciesRouter.get('/', authenticateToken, findVacancy);

export { vacanciesRouter };
