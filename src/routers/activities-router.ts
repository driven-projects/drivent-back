import { Router } from 'express';
import { getActivities, seatsByActivityAndLocationId } from '@/controllers';
import { validateBody } from '@/middlewares';
import { getSeatsSchema } from '@/schemas/seatsSchema';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);
activitiesRouter.post('/seatsByActivityAndLocationId', validateBody(getSeatsSchema), seatsByActivityAndLocationId);
export { activitiesRouter };
