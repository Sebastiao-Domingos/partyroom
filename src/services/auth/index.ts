import { api } from '@/infra/api';
import { TokenService } from '../token';

export type SessionBody = {
  contact: string;
  password: string;
  type: 'ADMIN' | 'SUPPLIER' | 'CLIENT';
};

export type SessionResponse = {
  refresh_token: string;
  token: string;
  data: DataLogin;
};

export type DataLogin = {
  id: number;
  first_name: string;
  last_name: string;
  type: 'ADMIN' | 'SUPPLIER' | 'CLIENT';
};

export type UserData = {
  id: number;
  email?: string;
  first_name: string;
  last_name: string;
  admin_level?: number;
  user_type: string;
  phone_number?: string;
  is_active: boolean;
  address?: string;
  company_name?: string;
};

export class Session {
  private static base_url = 'session/';

  async login(body: SessionBody): Promise<DataLogin> {
    console.log('service : ', body);

    const response = await api.post<SessionResponse>(
      `${Session.base_url}`,
      body
    );
    const { data, token } = response.data;
    TokenService.saveToken(token);
    return data;
  }

  async logout() {
    await TokenService.removeToken();
  }

  async getUseData(): Promise<UserData> {
    const response = await api.get<UserData>(`${'userdata/'}`);
    return response.data;
  }
}
