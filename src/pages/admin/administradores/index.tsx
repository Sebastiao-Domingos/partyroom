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
import Register from './register';
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

function administradores() {
  return (
    <div>
      <div className="flex mb-6">
        <div>
          <h1 className="text-orange-500 font-bold border-l pl-2 uppercase">
            Administradores
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
                <BreadcrumbPage className="text-[12px]">
                  Administradores
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <Register />
      </div>

      <TableDemo />
    </div>
  );
}

function TableDemo() {
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

export default administradores;
