import { Router } from 'express';
import { getHotels } from '@/controllers';

const hotelsRouter = Router();

hotelsRouter.get('/', getHotels);
hotelsRouter.post('/', getHotels);

export { hotelsRouter };
