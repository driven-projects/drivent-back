import { findVacancyByUserId, patchVacancy } from '@/repositories/vacancies-repository';

export async function updateVacancy(data: any) {
  const userReserve = await findVacancyByUser(data.userId);

  if (userReserve) {
    await patchVacancy({ isAvailable: true, userId: null, id: data.id });
  }

  await patchVacancy(data);
}

export async function findVacancyByUser(userId: number) {
  return await findVacancyByUserId(userId);
}
