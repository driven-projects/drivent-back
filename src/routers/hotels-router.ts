import { Router } from 'express';
import { getHotelsInfo } from '@/controllers/hotels-controller';

const hotelsRouter = Router();

hotelsRouter.get('/', getHotelsInfo);

export { hotelsRouter };
