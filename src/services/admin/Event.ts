import { api } from '@/infra/api';
import { Room } from './Room';

export type Event = {
  id?: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  partyroom?: Room[];
};
export type EventResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: Event[];
};

export class EventService {
  private static base_url = '/eventtypes/';

  async get() {
    const response = await api.get<EventResponse>(EventService.base_url);
    const data = response.data;
    return data;
  }

  async getById(id: number) {
    const response = await api.get<Event>(
      `${EventService.base_url}${id}/detail`
    );
    const data = response.data;
    return data;
  }

  async create(body: Event) {
    const response = await api.post<Event>(EventService.base_url, body);
    const data = response.data;
    return data;
  }

  async update(data: Event) {
    const response = await api.patch<Event>(
      `${EventService.base_url}${data.id}`,
      data
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${EventService.base_url}${id}`);
    return true;
  }
}
