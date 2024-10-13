import { EventService } from '@/services/admin/Event';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const service = new EventService();

export function useGetEvents() {
  const { data, ...result } = useQuery({
    queryFn: service.get,
    queryKey: ['events'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetDetailEvent(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['events'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
