import { RoomService } from '@/services/supplier/Room';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
const service = new RoomService();

export function useGetRoomsSupplier() {
  const { data, ...result } = useQuery({
    queryFn: service.get,
    queryKey: ['rooms'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
