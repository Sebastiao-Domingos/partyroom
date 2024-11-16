import { api } from '@/infra/api';

export type Service = {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  name: string;
  description: string;
  price: number;
};
export type ServiceResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: Service[];
};

export class ServiceService {
  private static base_url = '/services/';

  async getAll(): Promise<ServiceResponse> {
    const response = await api.get<ServiceResponse>(ServiceService.base_url);

    const data = await response.data;

    return data;
  }

  async getById(id: number) {
    const response = await api.get<Service>(`${ServiceService.base_url}/${id}`);
    const data = response.data;
    return data;
  }

  async create(body: Service) {
    const response = await api.post<Service>(
      `${ServiceService.base_url}`,
      body
    );
    const data = response.data;
    return data;
  }

  async update(data: Service) {
    const response = await api.put<Service>(
      `${ServiceService.base_url}${data.id}`,
      data
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${ServiceService.base_url}${id}`);

    return true;
  }
}
