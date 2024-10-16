import { Session } from '@/services/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const service = new Session();

export function useAuth() {
  const queryClient = useQueryClient();
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  // const [sucess, setSuccess] = useState<boolean>(false);
  // const [data, setData] = useState<DataLogin | null>(null);

  const login = useMutation({
    mutationFn: service.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    // try {
    //   setLoading(true);
    //   setError(null);
    //   setSuccess(false);
    //   const response = await service.login(body).then((response) => response);
    //   setData(response);
    //   setSuccess(true);
    // } catch (error) {
    //   setError('Erro ao fazer login');
    //   console.log(error);
    // } finally {
    //   setLoading(false);
    // }
  });

  const logout = useMutation({
    mutationFn: service.logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return { login, logout };
}
