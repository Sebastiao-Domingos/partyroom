import { TokenService } from '@/services/token';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_API_URL || 'http://localhost:8000/api',
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
