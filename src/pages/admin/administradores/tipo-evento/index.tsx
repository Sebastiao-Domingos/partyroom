import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ListEvent from './list-event';

export default function TiposEvento() {
  return (
    <div>
      <div className="">
        <h1 className="text-primary font-bold border-l pl-2 uppercase">
          Tipos de eventos
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
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard/definicoes"
                  className="text-[12px]"
                >
                  Definições
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-[12px]">
                Tipos eventos
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="mt-8">
        <fieldset className="border border-border p-4 rounded">
          <legend className="px-1">Criar novo tipo de evento</legend>
          <form action="">
            <div className="flex gap-4">
              <Input placeholder="Digitar o nome" className="w-full" />{' '}
              <Button>Adicionar</Button>
            </div>
          </form>
        </fieldset>
      </div>

      <div className="mt-6">
        <h2 className="text-primary font-semibold">Tipos de eventos</h2>

        <ListEvent />
      </div>
    </div>
  );
}
