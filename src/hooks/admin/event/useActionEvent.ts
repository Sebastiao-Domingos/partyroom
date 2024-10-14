'use client';
import { EventService } from '@/services/admin/Event';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const service = new EventService();

export function useActionEvent() {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: service.update,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });

  const mutationDelete = useMutation({
    mutationFn: service.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['events'] }),
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
}
