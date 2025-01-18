import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useActionSolicitation } from "@/hooks/admin/solicitation/useActionSolicitation";
import { Solicitation } from "@/services/admin/Solicitation";
import { toast } from "react-toastify";

export function Aprovar({ salao }: { salao: Solicitation }) {
  const { mutationUpdate } = useActionSolicitation();

  const handleUpdate = (data: Partial<Solicitation>) => {
    mutationUpdate.mutate(data, {
      onSuccess: () => {
        toast.success("Feita com sucesso!");
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Aceitar</Button>
      </DialogTrigger>
      <DialogContent className="min-h-[300px] flex flex-col">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Aprovar ou negar a solicitação</DialogTitle>
          <DialogDescription>
            Aqui podes aprovar ou negar a solicitação
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <p>
            <span className="w-[200px]">Quantidades de horas </span>
            <span className="font-bold ml-4 border-l pl-4">
              {salao.ammount_hours}
            </span>{" "}
          </p>
          <p>
            <span className="w-[200px]">Preço </span>
            <span className="font-bold ml-4 border-l pl-4">
              {salao.price}
            </span>{" "}
          </p>
          <p>
            <span className="w-[200px]">Hora de inicio</span>
            <span className="font-bold ml-4 border-l pl-4">
              {salao.begining_hour}
            </span>{" "}
          </p>
          <p>
            <span className="w-[200px]">Data da solicitação </span>
            <span className="font-bold ml-4 border-l pl-4">
              {salao.data}
            </span>{" "}
          </p>
          <p>
            <span className="w-[200px]">Data que foi solicitada</span>
            <span className="font-bold ml-4 border-l pl-4">
              {salao.created_at!.toString().split("T")[0]}
            </span>{" "}
          </p>
        </div>
        <div className="flex gap-4 ml-auto">
          <Button
            variant={"outline"}
            onClick={() => {
              handleUpdate({ id: salao.id, state: "rejected" });
            }}
            disabled={mutationUpdate.isPending}
          >
            Rejeitar
          </Button>
          <Button
            variant={"default"}
            onClick={() => {
              handleUpdate({ id: salao.id, state: "approved" });
            }}
            disabled={mutationUpdate.isPending}
          >
            Aprovar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
