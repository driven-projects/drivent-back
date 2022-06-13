import { patchVacancy } from '@/repositories/vacancies-repository';

export async function updateVacancy(data: any) {
  await patchVacancy(data);
}
