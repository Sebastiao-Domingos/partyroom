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
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader';
import { useGetRoomsSupplier } from '@/hooks/supplier/room/useGetRoom';
import { Button } from '@/components/ui/button';
import { Tractor } from 'lucide-react';
import Delete from './delete';

export default function ListRoom() {
  const navigator = useRouter();
  const { data, result } = useGetRoomsSupplier();
  if (result.isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (result.isError) {
    return (
      <div className="text-center text-destructive font-semibold">
        {result.error.message}
      </div>
    );
  }

  if (result.isSuccess) {
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
            <TableHead className="text-left">...Outros</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.result.map((room) => (
            <TableRow key={room.id}>
              <TableCell
                onClick={() =>
                  navigator.push(`/supplier/dashboard-sup/saloes/${room.id}`)
                }
                className="cursor-pointer py-1"
              >
                <Image
                  src={room.image}
                  alt={room.name}
                  width={100}
                  height={100}
                  className="w-[60px] h-[60px] object-cover border rounded-full"
                />
              </TableCell>
              <TableCell
                onClick={() =>
                  navigator.push(`/supplier/dashboard-sup/saloes/${room.id}`)
                }
                className="cursor-pointer font-medium"
              >
                {room.name}
              </TableCell>
              <TableCell>{room.opening_time}</TableCell>
              <TableCell>{room.closing_time}</TableCell>
              <TableCell className="text-left">
                {room.price_per_hour} , 00 Kz
              </TableCell>
              <TableCell>
                <Delete id={room.id} name={room.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
