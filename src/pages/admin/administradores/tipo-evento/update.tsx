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
import { Edit2Icon } from 'lucide-react';
import { DialogClose } from '@radix-ui/react-dialog';
import { Event } from '@/services/admin/Event';
import { useActionEvent } from '@/hooks/admin/event/useActionEvent';

export default function Edite({ event }: { event: Event }) {
  const { mutationUpdate } = useActionEvent();
  const { register, handleSubmit } = useForm<Event>({
    defaultValues: { name: event.name, id: event.id },
  });

  const submit = (data: Event) => {
    if (data.name !== '') {
      mutationUpdate.mutate(data);
    } else {
      toast.warning('O campo não pode ser vazia!');
    }
    if (mutationUpdate.isSuccess) {
      toast.success('Tipo de evento atualizado com sucesso!');
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
              Editar os dados de um tipo de evento
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
