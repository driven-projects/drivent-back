import { prisma } from '@/config';

export async function patchVacancy(data: any) {
  await prisma.vacancies.update({
    where: {
      id: data.id,
    },
    data,
  });
}

export async function findVacancyByUserId(userId: number) {
  return prisma.vacancies.findUnique({
    where: {
      userId: userId,
    },
  });
}
