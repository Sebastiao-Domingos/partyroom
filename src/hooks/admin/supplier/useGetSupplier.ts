import { SupplierService } from '@/services/admin/Supplier';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

const service = new SupplierService();

export function useGetSupplier() {
  const { data, ...result } = useQuery({
    queryFn: service.getAll,
    queryKey: ['suppliers'],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetDetailSupplier(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ['suppliers'],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}
