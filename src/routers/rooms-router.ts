import { Router } from 'express';
import { bookRoom, deleteBedRental, findSelectedRoom } from '@/controllers';
import { deleteBedRentalSchema, selectRoomSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';

const roomsRouter = Router();

roomsRouter.all('/*', authenticateToken).post('/', validateBody(selectRoomSchema), bookRoom).get('/', findSelectedRoom);
roomsRouter.all('/*', authenticateToken).delete('/', validateBody(deleteBedRentalSchema), deleteBedRental);
export { roomsRouter };
