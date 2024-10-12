'use client';
import { DataLogin, Session, SessionBody } from '@/services/auth';
import { useState } from 'react';

const service = new Session();

export function useAuth() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<DataLogin | null>(null);

  const login = async (body: SessionBody) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await service.login(body).then((response) => response);
      setData(response);
      setSuccess(true);
    } catch (error) {
      setError('Erro ao fazer login');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await service.logout();
    } catch (error) {
      setError('Erro em atualizar evento');
      console.log(error);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  return { login, logout, loading, sucess, error, data };
}
