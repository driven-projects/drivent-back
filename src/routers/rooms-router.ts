import { Router } from 'express';
import { bookRoom, findSelectedRoom } from '@/controllers';
import { selectRoomSchema } from '@/schemas';
import { authenticateToken, validateBody } from '@/middlewares';

const roomsRouter = Router();

roomsRouter.all('/*', authenticateToken).post('/', validateBody(selectRoomSchema), bookRoom).get('/', findSelectedRoom);

export { roomsRouter };
