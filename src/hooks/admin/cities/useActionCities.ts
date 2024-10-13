import { CityService } from '@/services/admin/City';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const service = new CityService();
export function useActionCity() {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: service.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cities'] });
    },
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
}
