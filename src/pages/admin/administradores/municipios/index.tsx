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
import { useGetCities } from '@/hooks/admin/cities/useGetCities';
import Loader from '@/components/loader';
import { useActionCity } from '@/hooks/admin/cities/useActionCities';
import { useForm } from 'react-hook-form';
import { City } from '@/services/admin/City';
import { Delete } from './delete';
import { showToast } from '@/components/toast';
import { Edite } from './update';

export default function Municipios() {
  const { mutationCreate } = useActionCity();
  const { register, handleSubmit } = useForm<City>();

  const submit = (data: City) => {
    mutationCreate.mutate(data);
  };

  if (mutationCreate.isSuccess) {
    showToast('success', 'Município cadastrado com sucesso!');
  }
  if (mutationCreate.isError) {
    showToast('error', 'Erro : ' + mutationCreate.error.message);
  }
  return (
    <div>
      <div className="">
        <h1 className="text-primary font-bold border-l pl-2 uppercase">
          Municípios
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
                Municípios
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="mt-8">
        <fieldset className="border p-4 rounded">
          <legend className="px-1">Criar novo município</legend>
          <form onSubmit={handleSubmit(submit)}>
            <fieldset
              disabled={mutationCreate.isPending}
              className="flex gap-4"
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
      <ListCities />
    </div>
  );
}

function ListCities() {
  const { data, result } = useGetCities();

  return (
    <div className="mt-6">
      <h2 className="text-primary font-semibold">Municípios</h2>
      <div className="flex flex-wrap gap-4 mt-4">
        {result.isPending && <Loader />}
        {result.isError && (
          <p className="text-center text-red-500">Erro ao listar a cidades !</p>
        )}
        {result.isSuccess &&
          data!.result.map((city, index) => (
            <div
              key={index}
              className="flex flex-col w-[32%] p-2 border border-border rounded hover:border-primary/50"
            >
              <div className="flex flex-col">
                <p className="">{city.name}</p>
                <p className="text-sm italic text-slate-400">
                  {city.created_at?.toString().split('T')[0]}
                </p>
              </div>
              <div className="flex gap-3 ml-auto">
                <Edite city={city} />
                <Delete data={city} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
