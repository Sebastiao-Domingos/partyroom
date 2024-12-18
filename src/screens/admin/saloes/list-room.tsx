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
import { useGetRooms } from '@/hooks/admin/room/useGetRoom';
import Loader from '@/components/loader';

export default function ListRoom() {
  const navigator = useRouter();
  const { data, result } = useGetRooms({});
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

            <TableHead className="text-left">Preço por hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.result.map((room) => (
            <TableRow
              key={room.id}
              onClick={() => navigator.push(`/dashboard/saloes/${room.id}`)}
              className="cursor-pointer"
            >
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

              <TableCell className="text-left">
                {room.price_per_hour} , 00 Kz
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
