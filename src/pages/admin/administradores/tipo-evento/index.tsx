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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ListEvent from './list_event';
import { useActionEvent } from '@/hooks/admin/event/useActionEvent';
import { useForm } from 'react-hook-form';
import { Event } from '@/services/admin/Event';
import Loader from '@/components/loader';
import { showToast } from '@/components/toast';

export default function TiposEvento() {
  const { mutationCreate } = useActionEvent();
  const { register, handleSubmit } = useForm<Event>();
  const submit = (data: Event) => {
    mutationCreate.mutate(data);
  };

  if (mutationCreate.isSuccess) {
    showToast('success', 'Evento criado com sucesso!');
  }
  if (mutationCreate.isError) {
    showToast('error', `Erro : ${mutationCreate.error.message}`);
  }
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
          <form onSubmit={handleSubmit(submit)}>
            <fieldset
              className="flex gap-4"
              disabled={mutationCreate.isPending}
            >
              <Input
                placeholder="Digitar o nome"
                className="w-full"
                {...register('name', { required: true })}
              />{' '}
              <Button>
                {!mutationCreate.isPending && 'Adicionar'}
                {mutationCreate.isPending && <Loader />}
              </Button>
            </fieldset>
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
