import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Loader from '@/components/loader';
import { toast } from 'react-toastify';
import { useActionSupplier } from '@/hooks/admin/supplier/useACtionSupplier';
import { Supplier } from '@/services/admin/Supplier';

export default function Register() {
  const { mutationCreate } = useActionSupplier();
  const { register, handleSubmit } = useForm<Supplier>();
  const [pass, setPass] = useState('');

  const submit = (data: Supplier) => {
    data.user_type = 'SUPPLIER';

    if (data.password === pass) {
      mutationCreate.mutate(data);
    } else {
      toast.warning('As palavras passes devem ser iguais!');
    }
    if (mutationCreate.isSuccess) {
      toast.success('Fornecedor criado com sucesso!');
    }

    if (mutationCreate.isError) {
      toast.error('Error: ' + mutationCreate.error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-h-[calc(100vh-80px)]">
        <form onSubmit={handleSubmit(submit)}>
          <DialogHeader>
            <DialogTitle>Adicionar Fornecedor</DialogTitle>
            <DialogDescription>
              Adiconar fornecedores para gerenciarem o sistema
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className=" py-4">
            <div className="h-[350px] flex flex-col gap-4 px-1">
              <div className="flex flex-row-reverse gap-2">
                <div className="w-full grid grid-rows-1 items-start gap-2">
                  <label htmlFor="name" className="text-left font-thin">
                    Primeiro Nome
                  </label>
                  <Input
                    id="name"
                    className="col-span-3"
                    {...register('first_name', { required: true })}
                  />
                </div>
              </div>
              <div className="grid grid-rows-1 items-start gap-2">
                <label htmlFor="last_name" className="text-left font-thin">
                  Ultimo Nome
                </label>
                <Input
                  id="last_name"
                  className="col-span-3"
                  {...register('last_name', { required: true })}
                />
              </div>
              <div className="grid grid-rows-1 items-start gap-2">
                <label htmlFor="email" className="text-left font-thin">
                  Whatsapp
                </label>
                <Input
                  id="email"
                  className="col-span-3"
                  type="tel"
                  {...register('phone_number', { required: true })}
                />
              </div>
              <div className="grid grid-rows-1 items-start gap-2">
                <label htmlFor="companhia" className="text-left font-thin">
                  Companhia
                </label>
                <Input
                  id="companhia"
                  className="col-span-3"
                  type="tel"
                  {...register('compant_name', { required: true })}
                />
              </div>

              <div className="grid grid-rows-1 items-start gap-2">
                <label htmlFor="pass1" className="text-left font-thin">
                  Palavra Passe
                </label>
                <Input
                  id="pass1"
                  className="col-span-3"
                  type="password"
                  {...register('password', { required: true })}
                />
              </div>
              <div className="grid grid-rows-1 items-start gap-2">
                <label htmlFor="pass2" className="text-left font-thin">
                  Confirmar a Palavra Passe
                </label>
                <Input
                  id="pass2"
                  className="col-span-3"
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.currentTarget.value)}
                />
              </div>
            </div>

            <ScrollBar orientation="vertical" />
          </ScrollArea>
          <DialogFooter className="fix bottom-0 right-0 left-0">
            <Button type="submit">
              {!mutationCreate.isPending && 'Salvar'}
              {mutationCreate.isPending && <Loader />}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
