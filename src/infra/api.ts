import { TokenService } from '@/services/token';
import axios from 'axios';
//'https://partyroom-api.vercel.app/api/'
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL!,
  headers: {
    Accept: 'application/json', // Utilize "Accept" ao invés de "accept-type"
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = TokenService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
