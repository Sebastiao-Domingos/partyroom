import { api } from '@/infra/api';

export type City = {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  name: string;
};
export type CityResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: City[];
};

export class CityService {
  private static base_url = '/cities/';

  async getAll(): Promise<CityResponse> {
    const response = await api.get<CityResponse>(CityService.base_url);

    const data = await response.data;

    return data;
  }

  async getById(id: number) {
    const response = await api.get<City>(`${CityService.base_url}/${id}`);
    const data = response.data;
    return data;
  }

  async create(body: City) {
    const response = await api.post<City>(CityService.base_url, body);
    const data = response.data;
    return data;
  }

  async update(data: City) {
    const response = await api.put<City>(
      `${CityService.base_url}/${data.id}`,
      data
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${CityService.base_url}/${id}`);

    return true;
  }
}
