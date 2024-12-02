import { RoomService, SearchParamsRooms } from '@/services/admin/Room';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
const service = new RoomService();

export function useGetRooms(filter: Partial<SearchParamsRooms>) {
  const [query, setQuery] = useState(filter);
  const { data, ...result } = useQuery({
    queryFn: () => service.get(query),
    queryKey: ['rooms', query],
    placeholderData: keepPreviousData,
  });

  function filtro(filter: Partial<SearchParamsRooms>) {
    setQuery((prev) => ({ ...prev, ...filter }));
  }

  return { data, result, filtro };
}

export function useGetDetailRoom(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
