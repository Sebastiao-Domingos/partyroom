import { EventResponse, EventService } from '@/services/admin/Event';
import { useEffect, useState } from 'react';

const service = new EventService();

function useGetEvent() {
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await service.get();
        setEvent(response);
        console.log(response);
      } catch {
        setError('Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { event, loading, error };
}

export { useGetEvent };
