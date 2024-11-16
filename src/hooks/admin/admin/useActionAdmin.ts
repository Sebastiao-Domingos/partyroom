import { AdminService } from '@/services/admin/Admin';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const service = new AdminService();
export function useActionAdmin() {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrators'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrators'] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: service.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['administrators'] });
    },
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
}
