import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';

import { loadEnv, connectDb, disconnectDB, initRedis } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';

export { paymentsRouter };
import {
  usersRouter,
  authenticationRouter,
  eventsRouter,
  enrollmentsRouter,
  paymentsRouter,
  hotelsRouter,
  vacanciesRouter,
} from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/payments', paymentsRouter)
  .use('/hotels', hotelsRouter)
  .use('/vacancies', vacanciesRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  initRedis();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
