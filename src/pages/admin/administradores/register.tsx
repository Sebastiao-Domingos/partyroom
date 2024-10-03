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
      <DialogContent className="sm:max-w-[525px] max-h-[calc(100vh-80px)]">
        <DialogHeader>
          <DialogTitle>Adicionar Administrador</DialogTitle>
          <DialogDescription>
            Adiconar administradores para gerenciarem o sistema
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className=" py-4">
          <div className="h-[350px] flex flex-col gap-4 px-1">
            <div className="grid grid-rows-1 items-start gap-2">
              <label htmlFor="name" className="text-left font-thin">
                Primeiro Nome
              </label>
              <Input
                id="name"
                defaultValue="Pedro Duarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-rows-1 items-start gap-2">
              <label htmlFor="username" className="text-left font-thin">
                Ultimo Nome
              </label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-rows-1 items-start gap-2">
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

            <div className="grid grid-rows-1 items-start gap-2">
              <label htmlFor="username" className="text-left font-thin">
                Palavra Passe
              </label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
                type="password"
              />
            </div>
            <div className="grid grid-rows-1 items-start gap-2">
              <label htmlFor="username" className="text-left font-thin">
                Confirmar a Palavra Passe
              </label>
              <Input
                id="username"
                defaultValue="@peduarte"
                className="col-span-3"
                type="password"
              />
            </div>
          </div>

          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <DialogFooter className="fix bottom-0 right-0 left-0">
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
