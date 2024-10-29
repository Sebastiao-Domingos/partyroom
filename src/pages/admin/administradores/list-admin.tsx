'use client';
import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetAdmin } from '@/hooks/admin/admin/useGetAdmin';
import Loader from '@/components/loader';

export default function TableDemo() {
  const { data, result } = useGetAdmin();

  if (result.isPending)
    return (
      <div className="flex justify-center items-center w-full">
        <Loader />
      </div>
    );

  if (result.isError) {
    return (
      <div className="w-full flex ">
        <p className="text-red-400 m-auto">Erro ao carregar os dados!</p>
      </div>
    );
  }

  if (result.isSuccess && data)
    return (
      <Table>
        <TableCaption>Lista dos administradores.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Primeiro nome</TableHead>
            <TableHead>Ultimo nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Estado</TableHead>

            <TableHead className="text-right">Tipo de usuário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.result?.map((admin, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{admin.first_name}</TableCell>
              <TableCell className="font-medium">{admin.last_name}</TableCell>
              <TableCell>{admin.email}</TableCell>
              <TableCell>{admin.is_active ? 'Ativo' : 'Desativo'}</TableCell>
              <TableCell className="text-right">{admin.user_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell colSpan={2} className="text-right">
              {data.total.toString().padStart(2, '0')}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
}
