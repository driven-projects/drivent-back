import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import ticketController from '@/controllers/ticket-controller';

const ticketRouter = Router();

ticketRouter.get('/:id', ticketController.getTicketsPerEvent);

export { ticketRouter };
