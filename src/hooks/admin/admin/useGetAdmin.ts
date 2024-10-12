import { AdminService } from '@/services/admin/Admin';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const service = new AdminService();

export function useGetAdmin() {
  const { data, ...result } = useQuery({
    queryFn: service.get,
    queryKey: ['user'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetDetailAdmin(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['user'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
