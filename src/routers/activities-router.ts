import { Router } from 'express';
import { getActivities, newSubscriptionSeat, seatsByActivityAndLocationId, seatsByEnrollmentId } from '@/controllers';
import { validateBody } from '@/middlewares';
import { getSeatsByEnrollmentIdSchema, getSeatsSchema, newSubscriptionSeatSchema } from '@/schemas/seatsSchema';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);
activitiesRouter.post('/seatsByActivityAndLocationId', validateBody(getSeatsSchema), seatsByActivityAndLocationId);
activitiesRouter.post('/seatsByEnrollmentId', validateBody(getSeatsByEnrollmentIdSchema), seatsByEnrollmentId);
activitiesRouter.post('/newSubscription', validateBody(newSubscriptionSeatSchema), newSubscriptionSeat);
export { activitiesRouter };
