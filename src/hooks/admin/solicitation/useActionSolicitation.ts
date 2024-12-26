import { SolicitationService } from "@/services/admin/Solicitation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const service = new SolicitationService();
export function useActionSolicitation() {
  const queryClient = useQueryClient();
  const mutationCreate = useMutation({
    mutationFn: service.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solicitations"] });
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: service.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solicitations"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: service.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["solicitations"] });
    },
  });

  return { mutationCreate, mutationUpdate, mutationDelete };
}
