'use client';
import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetRoom } from '@/hooks/admin/room/useGetRoom';
import Image from 'next/image';

export function ListRoom() {
  const { error, data, loading, sucess } = useGetRoom();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-destructive font-semibold">{error}</div>
    );
  }

  if (sucess) {
    return (
      <Table>
        <TableCaption>Lista dos Salões.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Tempo de abrir</TableHead>
            <TableHead>Tempo de fechar</TableHead>
            <TableHead className="text-left">Preço por hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.result.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="py-1">
                <Image
                  src={room.image}
                  alt={room.name}
                  width={100}
                  height={100}
                  className="w-[60px] h-[60px] object-cover border rounded-full"
                />
              </TableCell>
              <TableCell className="font-medium">{room.name}</TableCell>
              <TableCell>{room.opening_time}</TableCell>
              <TableCell>{room.closing_time}</TableCell>
              <TableCell className="text-left">{room.price_per_hour}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
