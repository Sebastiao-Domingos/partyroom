import { Session } from '@/services/auth';
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const service = new Session();

function useGetUserData() {
  const client = useQueryClient();
  const { data, status } = useQuery({
    queryKey: ['user'],
    queryFn: service.getUseData,
    placeholderData: keepPreviousData,
    retry: false,
  });

  function refrash() {
    client
      .invalidateQueries({
        queryKey: ['user'],
      })
      .then(() => {
        window.location.href = window.location.pathname;
      });
  }

  return { user: data, status, refrash };
}

export { useGetUserData };
