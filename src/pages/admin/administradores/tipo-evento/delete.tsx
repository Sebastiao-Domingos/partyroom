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
import { showToast } from '@/components/toast';
import { useActionEvent } from '@/hooks/admin/event/useActionEvent';
import { Event } from '@/services/admin/Event';

export function Delete({ data }: { data: Event }) {
  const { mutationDelete } = useActionEvent();

  if (mutationDelete.isError) {
    showToast('error', `Erro : ${mutationDelete.error.message}`);
  }

  if (mutationDelete.isSuccess) {
    showToast('success', 'Evento eliminado com sucesso!');
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
          <DialogTitle>Apagar o evento {data.name}</DialogTitle>
          <DialogDescription className="text-red-500 font-bold">
            Pretendes mesmo eliminar este evento?
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
