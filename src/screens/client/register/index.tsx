'use client';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import Loader from '@/components/loader';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCities } from '@/hooks/admin/cities/useGetCities';
import Link from 'next/link';
import { ClientCreation } from '@/services/admin/Client';
import { useActionClient } from '@/hooks/admin/client/useActionClient';

const queryClient = new QueryClient();

export default function Register({
  searchParams,
}: {
  searchParams: { url: string };
}) {
  return (
    <div className="w-full /h-[100vh] flex justify-center items-center">
      <QueryClientProvider client={queryClient}>
        <div className="mt-[120px]">
          <CardWithForm url={searchParams.url!} />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export function CardWithForm({ url }: { url?: string }) {
  const { register, handleSubmit } = useForm<ClientCreation>();
  const { data, result } = useGetCities();
  const { mutationCreate } = useActionClient();
  const [city, setCity] = useState('');
  const [pass, setPass] = useState('');

  const onSubmit = (data: ClientCreation) => {
    data.city = Number(city);
    if (pass.trim() !== data.password) {
      toast('As palavras-passe devem ser iguais', { type: 'warning' });
      return;
    }
    mutationCreate.mutate(data);
  };

  if (mutationCreate.isSuccess) {
    toast('Conta criadas com sucesso', { type: 'success' });
    window.location.href = decodeURIComponent(url || '/login');
  }
  if (mutationCreate.isError) {
    toast(mutationCreate.error.message, { type: 'error' });
  }

  return (
    <Card className="w-full md:w-[600px] h-full border-none">
      <CardHeader>
        <CardTitle className="text-center text-primary">
          {' '}
          Cadastra-se aqui
        </CardTitle>
        <CardDescription className="text-sm text-center text-foreground">
          Preencha os teus dados cuidadosamente, obrigada por escolher-nos!
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <Input
            id="type"
            placeholder="E-mail"
            {...register('user_type')}
            value={'CLIENT'}
            className="hidden"
          />
          <fieldset className="p-4 rounded border">
            <legend className="text-sm font-medium text-foreground px-2">
              Dados pessoais
            </legend>
            <div className="grid w-full items-center gap-4 text-foreground">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="first_name">Primeiro nome</Label>
                <Input
                  id="first_name"
                  placeholder="Digite o primeiro nome"
                  {...register('first_name', { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="last_name">Ultimo nome</Label>
                <Input
                  id="last_name"
                  placeholder="Digite o ultimo nome"
                  {...register('last_name', { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="email">Nº telefone</Label>
                <Input
                  id="tel"
                  placeholder="Digite o número de telefone"
                  {...register('phone_number', { required: true })}
                  type="tel"
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="border border-border text-foreground rounded p-4 flex flex-col gap-5">
            <legend className="mx-2 px-3">Localidade</legend>
            {/* <div className="flex /flex-col md:flex-row gap-4"> */}
            <div className="space-y-2 w-full">
              <label htmlFor="nunicipio">Município</label>
              <Select value={city} onValueChange={(e) => setCity(e)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Municípios" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  {result.isSuccess &&
                    data?.result.map((num, index) => (
                      <SelectItem key={index} value={num.id!.toString()}>
                        {num.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-full">
              <label htmlFor="name">Distrito</label>
              <Input
                type="text"
                placeholder="Distrito"
                {...register('district', { required: true })}
              />
            </div>
            <div className="space-y-2 w-full">
              <label htmlFor="rua">Rua</label>
              <Input
                id="rua"
                type="text"
                placeholder="Rua"
                {...register('street', { required: true })}
              />
            </div>
            <div className="space-y-2 w-full">
              <label htmlFor="land_mark">Ponto de referência</label>
              <Input
                id="land_mark"
                type="text"
                placeholder="Ponto de referência"
                {...register('land_mark', { required: true })}
              />
            </div>
            {/* </div> */}
          </fieldset>
          <fieldset className="p-4 rounded border">
            <legend className="text-sm font-medium text-foreground px-2">
              Segurança
            </legend>
            <div className="grid w-full items-center gap-4 text-foreground">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="password">Palavra passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Palavra passe"
                  {...register('password', { required: true })}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="password1">Confirmar a palavra passe</Label>
                <Input
                  id="password1"
                  type="password"
                  placeholder="Palavra passe"
                  value={pass}
                  onChange={(e) => setPass(e.currentTarget.value)}
                />
              </div>
            </div>
          </fieldset>
        </CardContent>
        <CardFooter className="flex /justify-between gap-2">
          <Button className="w-[50%]" type="submit">
            {mutationCreate.isPending && <Loader />}
            {!mutationCreate.isPending && 'Cadastrar-se'}
          </Button>
          <Link
            href="/login"
            className="text-primary hover:text-primary-dark text-sm italic text-left"
          >
            Já possui uma conta? Clique aqui
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
