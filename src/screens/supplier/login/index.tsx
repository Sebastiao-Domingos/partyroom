'use client';
import React from 'react';

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
import { SessionBody } from '@/services/auth';
import { useAuth } from '@/hooks/auth/useAuth';
import Loader from '@/components/loader';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function Login() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <QueryClientProvider client={queryClient}>
        <div>
          <CardWithForm />
        </div>
      </QueryClientProvider>
    </div>
  );
}

export function CardWithForm() {
  const { register, handleSubmit } = useForm<SessionBody>();
  const { login } = useAuth();
  const onSubmit = (data: SessionBody) => {
    login.mutate(data);
  };

  if (login.isSuccess) {
    toast('Login feito com sucesso', { type: 'success' });
    window.location.href = '/supplier/dashboard-sup';
  }
  if (login.isError) {
    toast(login.error.message, { type: 'error' });
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center"> Fornecedor do Sistema</CardTitle>
        <CardDescription className="text-sm text-center">
          Faça o login para ter acesso ao painel do fornecedor.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Input {...register('type')} value={'SUPPLIER'} className="hidden" />

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="Whatsapp"
                {...register('contact', { required: true })}
                type="tel"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Palavra passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="Palavra passe"
                {...register('password', { required: true })}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button className="w-full" type="submit">
            {login.isPending && <Loader />}
            {!login.isPending && 'Login'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
