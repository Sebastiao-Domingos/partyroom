import { AdminService } from '@/services/admin/Admin';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

const service = new AdminService();

export function useGetAdmin() {
  const { data, ...result } = useQuery({
    queryFn: service.getAll,
    queryKey: ['administrators'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetDetailAdmin(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['administrators'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
