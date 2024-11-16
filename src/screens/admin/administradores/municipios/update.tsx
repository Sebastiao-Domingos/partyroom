'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Loader from '@/components/loader';
import { toast } from 'react-toastify';
import { City } from '@/services/admin/City';
import { useActionCity } from '@/hooks/admin/cities/useActionCities';
import { Edit2Icon } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';

export default function Edite({ city }: { city: City }) {
  const { mutationUpdate } = useActionCity();
  const { register, handleSubmit } = useForm<City>({
    defaultValues: { name: city.name, id: city.id },
  });

  const submit = (data: City) => {
    if (data.name !== '') {
      mutationUpdate.mutate(data);
    } else {
      toast.warning('O campo não pode ser vazia!');
    }
    if (mutationUpdate.isSuccess) {
      toast.success('Município atualizada com sucesso!');
    }

    if (mutationUpdate.isError) {
      toast.error('Error: ' + mutationUpdate.error.message);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button size={'icon'} variant={'outline_edit'}>
          <Edit2Icon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] /h-[300px]">
        <form onSubmit={handleSubmit(submit)}>
          <DialogHeader>
            <DialogTitle>Editar</DialogTitle>
            <DialogDescription>
              Editar os dados de um município
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 px-1">
            <div className="w-full grid grid-rows-1 items-start gap-2">
              <label htmlFor="name" className="text-left font-thin">
                Nome
              </label>
              <Input
                id="name"
                className="col-span-3"
                {...register('name', { required: true })}
              />
            </div>
          </div>
          <div className="mt-6 flex gap-4">
            <DialogClose asChild>
              <Button className="w-full" type="button" variant={'outline'}>
                Voltar
              </Button>
            </DialogClose>
            <Button type="submit" className="w-full">
              {!mutationUpdate.isPending && 'Salvar'}
              {mutationUpdate.isPending && <Loader />}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
