import { api } from '@/infra/api';

export type Admin = {
  email: string;
  first_name: string;
  last_name: string;
  admin_level: number;
  user_type: string;
  is_active: boolean;
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
  private base_url = '/administrators/';

  async get() {
    const response = await api.get<AdminResponse>(this.base_url);
    const data = await response.data;
    return data;
  }

  async getById(id: number) {
    const response = await api.get<Admin>(`${this.base_url}/${id}`);
    const data = await response.data;
    return data;
  }

  async create(body: Admin) {
    const response = await api.post<Admin>(this.base_url, body);
    const data = await response.data;
    return data;
  }

  async update(id: number, data: Admin) {
    const response = await api.put<Admin>(`${this.base_url}/${id}`, data);
    const updatedData = await response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${this.base_url}/${id}`);

    return true;
  }
}
