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
import { useAuth } from '@/hooks/auth/useAuth';
import Loader from '@/components/loader';
import { toast } from 'react-toastify';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionBody } from '@/services/auth';
import Link from 'next/link';

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
    window.location.href = '/';
  }
  if (login.isError) {
    toast(login.error.message, { type: 'error' });
  }

  return (
    <Card className="w-[380px] border-none">
      <CardHeader>
        <CardTitle className="text-center text-primary">
          {' '}
          Faça aqui o teu login
        </CardTitle>
        <CardDescription className="text-sm text-center">
          Faça o login para ter acesso ao teus dados.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)} className="text-foreground">
        <CardContent>
          <Input
            id="type"
            placeholder="E-mail"
            {...register('type')}
            value={'CLIENT'}
            className="hidden"
          />

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="email">Whatsapp</Label>
              <Input
                id="email"
                placeholder="Whatsapp"
                {...register('contact', { required: true })}
              />
            </div>
            <div className="flex flex-col space-y-3">
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
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" type="submit">
            {login.isPending && <Loader />}
            {!login.isPending && 'Login'}
          </Button>
          <Link
            href="/register"
            className="text-primary hover:text-primary-dark text-sm italic text-left"
          >
            Não possui uma conta? Clique aqui
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
