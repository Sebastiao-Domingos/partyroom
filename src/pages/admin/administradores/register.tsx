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

export function Register() {
  return (
    <Dialog>
      <DialogTrigger asChild className="ml-auto">
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Adicionar Administrador</DialogTitle>
          <DialogDescription>
            Adiconar administradores para gerenciarem o sistema
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="grid gap-4 py-4">
          <div className="grid grid-rows-1 items-start gap-4">
            <label htmlFor="name" className="text-left font-thin">
              Primeiro Nome
            </label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-rows-1 items-start gap-4">
            <label htmlFor="username" className="text-left font-thin">
              Ultimo Nome
            </label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-rows-1 items-start gap-4">
            <label htmlFor="username" className="text-left font-thin">
              Email
            </label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
              type="email"
            />
          </div>

          <div className="grid grid-rows-1 items-start gap-4">
            <label htmlFor="username" className="text-left font-thin">
              Palavra Passe
            </label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-rows-1 items-start gap-4">
            <label htmlFor="username" className="text-left font-thin">
              Confirmar a Palavra Passe
            </label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
