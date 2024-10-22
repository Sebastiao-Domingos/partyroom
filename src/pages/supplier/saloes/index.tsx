import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ListRoom } from './list-room';
import Link from 'next/link';

export default function saloes() {
  return (
    <div>
      <div className="flex justify-center items-start">
        <div className="">
          <h1 className="text-primary font-bold border-l pl-2 uppercase">
            Salões
          </h1>
          <div className="pl-2 mt-2 text-[12px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbPage className="text-[12px]">Home</BreadcrumbPage>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#" className="text-[12px]">
                    Fornecedor
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/supplier/dashboard-sup"
                    className="text-[12px]"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-[12px]">Salões</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <Link
          href={'/supplier/dashboard-sup/saloes/criar'}
          className="ml-auto bg-primary p-2 border-border items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          {' '}
          Adicionar
        </Link>
      </div>
      <div className="mt-6">
        <ListRoom />
      </div>
    </div>
  );
}
