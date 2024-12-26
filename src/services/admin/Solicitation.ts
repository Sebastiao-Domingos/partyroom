import { api } from "@/infra/api";

export type Solicitation = {
  id?: number;
  state: "pending" | "bought" | "confirmed";
  data: string;
  begining_hour: string;
  ammount_hours: number;
  price: number;
  owner: number;
  partyroom: number;
  event: number;
  created_at?: Date;
  updated_at?: Date;
};
export type SolicitationResponse = {
  links: {
    next: string | null;
    previous: string | null;
  };
  total: number;
  total_pages: number;
  result: Solicitation[];
};

export class SolicitationService {
  private static base_url = "/solicitations/";

  async create(data: Solicitation) {
    const response = await api.post<Solicitation>(
      `${SolicitationService.base_url}create`,
      data
    );
    const createdData = await response.data;
    return createdData;
  }
  async getAll(): Promise<SolicitationResponse> {
    const response = await api.get<SolicitationResponse>(
      SolicitationService.base_url
    );

    const data = await response.data;

    return data;
  }

  async getById(id: number) {
    const response = await api.get<Solicitation>(
      `${SolicitationService.base_url}${id}`
    );
    const data = response.data;
    return data;
  }

  async getByIdClient(id: number) {
    const response = await api.get<Solicitation>(
      `${SolicitationService.base_url}${id}/detail`
    );
    const data = response.data;
    return data;
  }

  async update(data: Solicitation) {
    const response = await api.put<Solicitation>(
      `${SolicitationService.base_url}${data.id}`,
      data
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${SolicitationService.base_url}${id}`);

    return true;
  }
}
