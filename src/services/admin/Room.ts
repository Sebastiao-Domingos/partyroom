import { api } from '@/infra/api';

export type Room = {
  id: number;
  name: string;
  image: string;
  owner: number;
  opening_time: string;
  closing_time: string;
  price_per_hour: string;
  capacity: number;
};
export type RoomResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: Room[];
};

export class RoomService {
  private base_url = '/partyrooms/';

  async get() {
    const response = await api.get<RoomResponse>(this.base_url);
    const data = await response.data;
    return data;
  }

  async getById(id: number) {
    const response = await api.get<Room>(`${this.base_url}/${id}`);
    const data = await response.data;
    return data;
  }

  async create(body: Room) {
    const response = await api.post<Room>(this.base_url, body);
    const data = await response.data;
    return data;
  }

  async update(id: number, data: Room) {
    const response = await api.put<Room>(`${this.base_url}/${id}`, data);
    const updatedData = await response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${this.base_url}/${id}`);

    return true;
  }
}
