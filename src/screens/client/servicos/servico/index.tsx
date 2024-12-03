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
import ListRoomClient from '@/components/rooms/list-rooms';
import { useGetServiceById } from '@/hooks/admin/service/useGetServices';
import Loader from '@/components/loader';

export default function Servico({ params }: { params: { servico: string } }) {
  const { data, result } = useGetServiceById(Number(params.servico));
  return (
    <div className="mt-[100px] mx-2 md:mx-12">
      <div className="flex items-start">
        <div className="">
          <h1 className="text-primary font-bold border-l pl-2 uppercase">
            Serviço
          </h1>
          <div className="pl-2 mt-2 text-[12px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbPage className="text-[12px]">Cliente</BreadcrumbPage>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/servicos" className="text-[12px]">
                    Serviços
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="mt-6">
        {result.isPending && (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
        {result.isSuccess && (
          <>
            <div className="flex flex-col gap-3 mb-4">
              <p>Nome do Serviço : {data?.name}</p>
              <p>Descrição do Serviço : {data?.description}</p>
              <p>Preço do serviço em geral : {data?.price}, 00 Kzs</p>
              {/* <p>Criado em : {data?.created_at!.toString().split('T')[0]}</p> */}
            </div>
            <ListRoomClient
              rooms={data?.partyroom}
              isError={result.isError}
              isPending={result.isPending}
              isSuccess={result.isSuccess}
              error={result.error}
            />
          </>
        )}
      </div>
    </div>
  );
}
