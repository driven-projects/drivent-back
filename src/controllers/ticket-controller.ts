import ticketService from '@/services/ticket-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketsPerEvent(req: Request, res: Response) {
  const { id } = req.params;
  const tickets = await ticketService.findAllByEventUniqueId(Number(id));
  res.status(httpStatus.OK).send(tickets);
}

const ticketController = {
  getTicketsPerEvent,
};

export default ticketController;
