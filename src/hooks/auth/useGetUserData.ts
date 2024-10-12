import { Session, UserData } from '@/services/auth';
import { useEffect, useState } from 'react';

const service = new Session();

function useGetUserData() {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);
        const response = await service.getUseData();
        setData(response);
        setSuccess(true);
      } catch {
        setError('Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error, sucess };
}

export { useGetUserData };
