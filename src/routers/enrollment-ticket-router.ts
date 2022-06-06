import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { postEnrollmentTicket } from '@/controllers/enrollment-ticket-controller';

const enrollmentTicketRouter = Router();

enrollmentTicketRouter.all('/*', authenticateToken).post('/', postEnrollmentTicket);

export { enrollmentTicketRouter };
