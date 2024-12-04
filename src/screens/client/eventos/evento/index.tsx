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
import { useGetDetailEvent } from '@/hooks/admin/event/useGetEvent';
import ListRoomClient from '@/components/rooms/list-rooms';
import Loader from '@/components/loader';

export default function Evento({ params }: { params: { evento: string } }) {
  const { data, result } = useGetDetailEvent(Number(params.evento));
  return (
    <div className="mt-[100px] mx-2 md:mx-12">
      <div className="flex items-start">
        <div className="">
          <h1 className="text-primary font-bold border-l pl-2 uppercase">
            Evento
          </h1>
          <div className="pl-2 mt-2 text-[12px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbPage className="text-[12px]">Cliente</BreadcrumbPage>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/eventos" className="text-[12px]">
                    Eventos
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
              <p>Descrição do Evento : {data?.name}</p>
              <p>Criado em : {data?.created_at?.split('T')[0]}</p>
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
