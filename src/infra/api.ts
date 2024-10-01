import { TokenService } from '@/services/token';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${TokenService.getToken()}`;

  return config;
});

export { api };
