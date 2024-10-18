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
export interface RoomDetail {
  id: number;
  owner: Owner;
  images: Image[];
  address: Address;
  services: Service[];
  event_types: Event[];
  opening_time: string;
  closing_time: string;
  created_at: string;
  updated_at: string;
  name: string;
  image: string;
  capacity: number;
  price_per_hour: string;
  rating: string;
  is_available: boolean;
}

export interface Owner {
  id: number;
  first_name: string;
  last_name: string;
  is_active: boolean;
  phone_number: string;
  company_name: string;
  user_type: string;
}

export interface Image {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  party_room: number;
}

export interface Address {
  city: City;
  street: string;
  district: string;
  land_mark: string;
}

export interface City {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface Service {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  price: string;
}

export class RoomService {
  private static base_url = '/partyrooms/';

  async get() {
    const response = await api.get<RoomResponse>(
      `${RoomService.base_url}supplier`
    );
    const data = await response.data;
    return data;
  }

  async getById(id: number) {
    const response = await api.get<RoomDetail>(`${RoomService.base_url}${id}`);
    const data = await response.data;
    return data;
  }

  async create(body: Room) {
    const response = await api.post<Room>(RoomService.base_url, body);
    const data = await response.data;
    return data;
  }

  async update(id: number, data: Room) {
    const response = await api.put<Room>(`${RoomService.base_url}${id}`, data);
    const updatedData = await response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${RoomService.base_url}${id}`);

    return true;
  }
}
