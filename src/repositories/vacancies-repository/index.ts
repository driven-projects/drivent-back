import { prisma } from '@/config';

export async function patchVacancy(data: any) {
  await prisma.vacancies.update({
    where: {
      id: data.id,
    },
    data,
  });
}
