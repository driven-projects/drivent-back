import { Router } from 'express';
import { getActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);

export { activitiesRouter };
