'use client';
import { EventService, Event } from '@/services/admin/Event';
import { useState } from 'react';

const service = new EventService();

export function useActionEvent() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<Event | null>(null);

  const create = async (body: Event) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await service.create(body).then((response) => response);
      setData(response);
    } catch (error) {
      setError('Erro em criar evento');
      console.log(error);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const update = async (body: Event) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const response = await service
        .update(body.id!, body)
        .then((response) => response);
      setData(response);
    } catch (error) {
      setError('Erro em atualizar evento');
      console.log(error);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  const remove = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await service.remove(id);
    } catch (error) {
      setError('Erro em deletar evento');
      console.log(error);
    } finally {
      setLoading(false);
      setSuccess(true);
    }
  };

  return { create, remove, update, loading, sucess, error, data };
}
