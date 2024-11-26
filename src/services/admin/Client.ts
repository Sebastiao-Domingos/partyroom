import { api } from '@/infra/api';

export type Client = {
  id?: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  user_type: string;
  is_active: boolean;
  password?: string;
  address: string;
};
export type ClientCreation = {
  id?: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  user_type: string;
  is_active: boolean;
  password?: string;
  street: string;
  city: number;
  district: string;
  land_mark: string;
};

export type ClientResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: Client[];
};

export class ClientService {
  private static base_url = '/clients/';

  async getAll(): Promise<ClientResponse> {
    const response = await api.get<ClientResponse>(ClientService.base_url);

    const data = await response.data;

    return data;
  }

  async getById(id: number) {
    const response = await api.get<Client>(`${ClientService.base_url}/${id}`);
    const data = response.data;
    return data;
  }

  async create(body: ClientCreation) {
    const response = await api.post<Client>(
      `${ClientService.base_url}create`,
      body
    );
    const data = response.data;
    return data;
  }

  async update(data: Client) {
    const response = await api.put<Client>(
      `${ClientService.base_url}/${data.id}`,
      data
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${ClientService.base_url}/${id}`);

    return true;
  }
}
