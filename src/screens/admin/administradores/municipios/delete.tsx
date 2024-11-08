'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Loader from '@/components/loader';
import { ArchiveXIcon } from 'lucide-react';
import { useActionCity } from '@/hooks/admin/cities/useActionCities';
import { City } from '@/services/admin/City';
import { showToast } from '@/components/toast';

export default function Delete({ data }: { data: City }) {
  const { mutationDelete } = useActionCity();

  if (mutationDelete.isError) {
    showToast('error', `Erro : ${mutationDelete.error.message}`);
  }

  if (mutationDelete.isSuccess) {
    showToast('success', 'Município eliminado com sucesso!');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="" size={'icon'} variant="outline_desttructive">
          <ArchiveXIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[calc(100vh-80px)]">
        <DialogHeader>
          <DialogTitle>Apagar o município {data.name}</DialogTitle>
          <DialogDescription className="text-red-500 font-bold">
            Pretendes mesmo eliminar este município?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="fix bottom-0 right-0 left-0 space-x-4">
          <DialogClose asChild>
            <Button variant={'outline'}>Voltar</Button>
          </DialogClose>
          <Button
            type="submit"
            variant={'destructive'}
            onClick={() => {
              mutationDelete.mutate(data.id!);
            }}
          >
            {!mutationDelete.isPending && 'Eliminar'}
            {mutationDelete.isPending && <Loader />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
