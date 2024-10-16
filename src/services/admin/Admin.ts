import { api } from '@/infra/api';

export type Admin = {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  admin_level: number;
  user_type: string;
  is_active: boolean;
  password?: string;
};
export type AdminResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: Admin[];
};

export class AdminService {
  private static base_url = '/administrators/';

  async getAll(): Promise<AdminResponse> {
    const response = await api.get<AdminResponse>(AdminService.base_url);

    const data = await response.data;

    return data;
  }

  async getById(id: number) {
    const response = await api.get<Admin>(`${AdminService.base_url}/${id}`);
    const data = response.data;
    return data;
  }

  async create(body: Admin) {
    const response = await api.post<Admin>(
      `${AdminService.base_url}create`,
      body
    );
    const data = response.data;
    return data;
  }

  async update(data: Admin) {
    const response = await api.put<Admin>(
      `${AdminService.base_url}${data.id}`,
      data
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${AdminService.base_url}/${id}`);

    return true;
  }
}
