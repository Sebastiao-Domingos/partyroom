import { api } from '@/infra/api';
import { Event } from './Event';

export type Room = {
  id: number;
  name: string;
  image: string;
  owner: number;
  opening_time: string;
  closing_time: string;
  price_per_hour: string;
  capacity: number;
  address: Address;
};

export type RoomCreation = {
  id: number;
  name: string;
  image: FileList;
  owner: number;
  opening_time: string;
  closing_time: string;
  price_per_hour: string;
  capacity: number;
  images: FileList[];
  services: string[];
  event_types: string[];
  policies: string[];
  city: number;
  street: string;
  district: string;
  land_mark: string;
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
    const response = await api.get<RoomResponse>(RoomService.base_url);
    const data = await response.data;
    return data;
  }

  async getById(id: number) {
    const response = await api.get<RoomDetail>(`${RoomService.base_url}${id}`);
    const data = await response.data;
    return data;
  }

  async create(body: RoomCreation) {
    const formData = new FormData();

    Object.entries(body).forEach((entry) => {
      const value = entry[1];
      if (Array.isArray(value)) {
        if (entry[0] !== 'images') {
          formData.append(entry[0], value.toString());
        } else {
          value.forEach((value) => {
            if (value instanceof FileList) {
              formData.append(entry[0], value.item(0)!);
            }
          });
        }
      } else if (
        typeof value === 'string' ||
        typeof value === 'boolean' ||
        typeof value === 'number'
      ) {
        formData.append(entry[0], value.toString());
      } else if (value !== undefined) {
        formData.append(entry[0], value.item(0)!);
      }
    });

    console.log(formData);

    const response = await api.post<RoomCreation>(
      `${RoomService.base_url}create`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const data = await response.data;
    return data;
  }

  async update(data: Room) {
    const response = await api.put<Room>(
      `${RoomService.base_url}${data.id}`,
      data
    );
    const updatedData = await response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${RoomService.base_url}${id}`);

    return true;
  }
}
