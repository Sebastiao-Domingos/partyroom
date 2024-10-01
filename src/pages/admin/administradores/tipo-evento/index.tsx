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

export default function TiposEvento() {
  return (
    <div>
      <div className="">
        <h1 className="text-orange-500 font-bold border-l pl-2 uppercase">
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
        <fieldset className="border p-4 rounded">
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
        <div className="flex flex-wrap gap-4 mt-4">
          {Array(7)
            .fill('')
            .map((_, index) => (
              <div
                key={index}
                className="w-[32%] p-2 border rounded hover:border-primary/50"
              >
                <span className="flex flex-col">
                  <p className="">Nome do evento</p>
                  <p className="text-sm italic text-slate-400 ml-auto">
                    Data de criação
                  </p>
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
