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
import { useGetRoomById } from '@/hooks/admin/room/useGetRoom';

export default function Salao({ params }: { params: { salao: number } }) {
  const { data, error, loading, sucess } = useGetRoomById(params.salao);
  return (
    <div>
      <div className="">
        <h1 className="text-primary font-bold border-l pl-2 uppercase">
          Salões #{' '}
          <span className="text-primary/80"> {sucess && data?.name}</span>
        </h1>
        <div className="pl-2 mt-2 text-[12px]">
          <Breadcrumb>
            <BreadcrumbList>
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
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard/saloes"
                  className="text-[12px]"
                >
                  Salões
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-[12px]">
                {sucess && data?.name}
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="mt-6">
        {loading && (
          <div className="flex justify-center items-center h-full">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {error && (
          <div className="text-center text-destructive font-semibold">
            {error}
          </div>
        )}
        {sucess && <div>{data?.name}</div>}
      </div>
    </div>
  );
}
