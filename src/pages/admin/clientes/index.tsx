'use client';
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
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
import Loader from '@/components/loader';
import { useGetClients } from '@/hooks/admin/client/useGetClient';

export default function clientes() {
  return (
    <div>
      <div className="">
        <h1 className="text-orange-500 font-bold border-l pl-2 uppercase">
          Clientes
        </h1>
        <div className="pl-2 mt-2 text-[12px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbPage className="text-[12px]">Home</BreadcrumbPage>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-[12px]">
                  Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard" className="text-[12px]">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-[12px]">Clientes</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="w-full flex gap-3">
        <TableDemo />
      </div>
    </div>
  );
}

export function TableDemo() {
  const { data, result } = useGetClients();

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
        <TableCaption>Lista dos clientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Primeiro nome</TableHead>
            <TableHead>Ultimo nome</TableHead>
            <TableHead>Nº telefone</TableHead>
            <TableHead>Estado</TableHead>

            <TableHead className="text-right">Tipo de usuário</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.result?.map((admin, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{admin.last_name}</TableCell>
              <TableCell className="font-medium">{admin.last_name}</TableCell>
              <TableCell>{admin.phone_number}</TableCell>
              <TableCell>{admin.is_active ? 'Ativo' : 'Desativo'}</TableCell>
              <TableCell className="text-right">{admin.user_type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell colSpan={2} className="text-right">
              {data.total.toString().padStart(3, '0')}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
}
