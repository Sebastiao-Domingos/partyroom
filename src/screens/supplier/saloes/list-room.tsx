"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { useGetRoomsSupplier } from "@/hooks/supplier/room/useGetRoom";
import Delete from "./delete";

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
            <TableHead className="text-left">Preço por hora</TableHead>
            <TableHead className="text-right">...Outros</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.result.map((room, index) => (
            <TableRow key={index}>
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

              <TableCell className="text-left">
                {room.price_per_hour} , 00 Kz
              </TableCell>
              <TableCell className="text-right">
                <Delete id={room.id} name={room.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
}
