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
import { Room } from '@/services/admin/Room';

type ListData = {
  rooms?: Room[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
};

export default function ListRoomClient({
  error,
  isError,
  isPending,
  isSuccess,
  rooms,
}: ListData) {
  const navigator = useRouter();
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-destructive font-semibold">
        {error!.message}
      </div>
    );
  }

  if (isSuccess && rooms) {
    return (
      <Table>
        <TableCaption>Lista dos Salões.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="text-left">Preço por hora</TableHead>
            <TableHead className="text-left">Capacidade</TableHead>
            <TableHead className="text-right">Município</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell
                onClick={() => navigator.push(`/saloes/${room.id}`)}
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
                onClick={() => navigator.push(`/saloes/${room.id}`)}
                className="cursor-pointer font-medium"
              >
                {room.name}
              </TableCell>

              <TableCell className="text-left">
                {room.price_per_hour} , 00 Kz
              </TableCell>
              <TableCell className="text-left">{room.capacity}</TableCell>
              <TableCell className="text-right">
                {room.address.city.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
