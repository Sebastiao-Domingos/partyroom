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

export default function Login() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div>
        <CardWithForm />
      </div>
    </div>
  );
}

export function CardWithForm() {
  const { register, handleSubmit } = useForm<SessionBody>();
  const { login, loading, error, sucess } = useAuth();
  const onSubmit = (data: SessionBody) => {
    login(data);
  };

  if (sucess) {
    toast('Login feito com sucesso', { type: 'success' });
    window.location.href = '/dashboard';
  }
  if (error) {
    toast(error, { type: 'error' });
  }

  //   if (sucessGetData) {
  //     toast('Você já está logado', { type: 'warning' });
  //     window.location.href = '/dashboard';
  //   }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="text-center"> Administração do Sistema</CardTitle>
        <CardDescription className="text-sm text-center">
          Faça o login para ter acesso ao painel administrativo.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Input
            id="type"
            placeholder="E-mail"
            {...register('type')}
            value={'ADMIN'}
            className="hidden"
          />

          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                placeholder="E-mail"
                {...register('contact', { required: true })}
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
            {loading && <Loader />}
            {!loading && 'Login'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
