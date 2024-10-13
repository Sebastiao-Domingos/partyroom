import { api } from '@/infra/api';

export type Supplier = {
  id?: number;
  phone_number: string;
  first_name: string;
  last_name: string;
  user_type: string;
  is_active: boolean;
  password?: string;
  compant_name: string;
};
export type SupplierResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: Supplier[];
};

export class SupplierService {
  private static base_url = '/suppliers/';

  async getAll(): Promise<SupplierResponse> {
    const response = await api.get<SupplierResponse>(SupplierService.base_url);

    const data = await response.data;

    return data;
  }

  async getById(id: number) {
    const response = await api.get<Supplier>(
      `${SupplierService.base_url}/${id}`
    );
    const data = response.data;
    return data;
  }

  async create(body: Supplier) {
    const response = await api.post<Supplier>(SupplierService.base_url, body);
    const data = response.data;
    return data;
  }

  async update(data: Supplier) {
    const response = await api.put<Supplier>(
      `${SupplierService.base_url}/${data.id}`,
      data
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${SupplierService.base_url}/${id}`);

    return true;
  }
}
