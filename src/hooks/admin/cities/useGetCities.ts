import { CityService } from '@/services/admin/City';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

const service = new CityService();

export function useGetCities() {
  const { data, ...result } = useQuery({
    queryFn: service.getAll,
    queryKey: ['cities'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetDetailAdmin(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['cities'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
