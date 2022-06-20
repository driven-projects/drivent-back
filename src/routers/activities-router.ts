import { Router } from 'express';
import { getActivities, newSubscriptionSeat, seatsByActivityAndLocationId } from '@/controllers';
import { validateBody } from '@/middlewares';
import { getSeatsSchema, newSubscriptionSeatSchema } from '@/schemas/seatsSchema';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);
activitiesRouter.post('/seatsByActivityAndLocationId', validateBody(getSeatsSchema), seatsByActivityAndLocationId);
activitiesRouter.post('/newSubscription', validateBody(newSubscriptionSeatSchema), newSubscriptionSeat);
export { activitiesRouter };
