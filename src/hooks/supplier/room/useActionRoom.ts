'use client';
import { Room, RoomService } from '@/services/admin/Room';
import { useState } from 'react';

const service = new RoomService();

export function useActionRoom() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sucess, setSuccess] = useState<boolean>(false);
  const [data, setData] = useState<Room | null>(null);

  const create = async (body: Room) => {
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

  const update = async (body: Room) => {
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
