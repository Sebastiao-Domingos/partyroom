import { RoomService } from '@/services/admin/Room';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
const service = new RoomService();

export function useGetRooms() {
  const { data, ...result } = useQuery({
    queryFn: service.get,
    queryKey: ['rooms'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetDetailRoom(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
