import { api } from "@/infra/api";
import { Event } from "./Event";
import { Client } from "./Client";
import { RoomDetail } from "./Room";

export type Solicitation = {
  id?: number;
  state: "pending" | "approved" | "payed" | "rejected";
  data: string;
  begining_hour: string;
  ammount_hours: number;
  price: number;
  owner: number;
  partyroom: number;
  event: Event;
  created_at?: Date;
  updated_at?: Date;
};

export type SolicitationCreate = {
  id?: number;
  state: "pending" | "approved" | "payed" | "rejected";
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
export type SolicitationDetail = {
  id?: number;
  state: "pending" | "approved" | "payed" | "rejected";
  data: string;
  begining_hour: string;
  ammount_hours: number;
  price: number;
  owner: Client;
  partyroom: RoomDetail;
  event: Event;
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

export interface SolicitationSearch {
  id?: number;
  state?: string;
  data?: string;
  begining_hour?: string;
  ammount_hours?: number;
  price?: number;
  owner?: number;
  partyroom?: number;
  event?: number;
}

export class SolicitationService {
  private static base_url = "/solicitations/";

  async create(data: SolicitationCreate) {
    const response = await api.post<SolicitationCreate>(
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
    const response = await api.get<SolicitationDetail>(
      `${SolicitationService.base_url}${id}`
    );
    const data = response.data;
    return data;
  }

  async getSolicitationById(id: number) {
    const response = await api.get<SolicitationDetail>(
      `${SolicitationService.base_url}${id}`
    );
    const data = response.data;
    return data;
  }

  async getClientSolicitations(): Promise<SolicitationResponse> {
    const response = await api.get<SolicitationResponse>(
      `${SolicitationService.base_url}client`
    );
    const data = response.data;
    return data;
  }

  async getSupplierSolicitions(
    seachParams?: Partial<SolicitationSearch>
  ): Promise<SolicitationResponse> {
    const params = new URLSearchParams();

    Object.entries(seachParams!).forEach((entry) => {
      if (entry[1]) {
        params.append(entry[0], entry[1].toString());
      }
    });

    const response = await api.get<SolicitationResponse>(
      `${SolicitationService.base_url}supplier?${params.toString()}`
    );

    const data = response.data;

    return data;
  }

  async update(data: Partial<Solicitation>) {
    const { id, ...rest } = data;
    const response = await api.patch<Solicitation>(
      `${SolicitationService.base_url}${id}/update`,
      rest
    );
    const updatedData = response.data;
    return updatedData;
  }

  async remove(id: number) {
    await api.delete(`${SolicitationService.base_url}${id}`);

    return true;
  }
}
