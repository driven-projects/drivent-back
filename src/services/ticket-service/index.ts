import ticketRepository from '@/repositories/ticket-repository';

export async function findAllByEventUniqueId(id: number) {
  const tickets = await ticketRepository.findAllByEventUniqueId(id);
  return tickets;
}

const ticketService = {
  findAllByEventUniqueId,
};

export default ticketService;
