import { ServiceService } from '@/services/admin/Service';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

const service = new ServiceService();

export function useGetservices() {
  const { data, ...result } = useQuery({
    queryFn: service.getAll,
    queryKey: ['services'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetServiceDetailAdmin(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['services'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetServiceById(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['services'],
    queryFn: () => service.getByIdClient(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
