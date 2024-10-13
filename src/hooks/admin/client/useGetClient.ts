import { ClientService } from '@/services/admin/Client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const service = new ClientService();

export function useGetClients() {
  const { data, ...result } = useQuery({
    queryFn: service.getAll,
    queryKey: ['clients'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetDetailClient(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['clients'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
