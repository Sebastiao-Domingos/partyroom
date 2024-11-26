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
import { useActionRoom } from '@/hooks/admin/room/useActionRoom';
import { toast } from 'react-toastify';

export default function Delete({ ...props }: { id: number; name: string }) {
  const { mutationDelete } = useActionRoom();

  if (mutationDelete.isSuccess) {
    toast('Salão eliminado com sucesso!', { type: 'success' });
  }
  if (mutationDelete.isError) {
    toast(mutationDelete.error.message, { type: 'error' });
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
          <DialogTitle>Apagar o salão {props.name}</DialogTitle>
          <DialogDescription className="text-red-500 font-bold">
            Pretendes mesmo eliminar este salão?
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
              mutationDelete.mutate(props.id);
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
