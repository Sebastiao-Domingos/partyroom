import { Session } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const service = new Session();

export function useAuth() {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: service.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logout = useMutation({
    mutationFn: service.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { login, logout };
}
