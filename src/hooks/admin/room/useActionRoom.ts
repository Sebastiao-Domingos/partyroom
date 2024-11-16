import { RoomService } from '@/services/admin/Room';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const service = new RoomService();
export function useActionRoom() {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: service.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
    },
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
}
