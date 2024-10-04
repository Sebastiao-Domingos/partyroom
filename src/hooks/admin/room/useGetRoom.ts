import { RoomDetail, RoomResponse, RoomService } from '@/services/admin/Room';
import { useEffect, useState } from 'react';

const service = new RoomService();

function useGetRoom() {
  const [data, setData] = useState<RoomResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await service.get();
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

function useGetRoomById(id: number) {
  const [data, setData] = useState<RoomDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await service.getById(id);
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
export { useGetRoom, useGetRoomById };
