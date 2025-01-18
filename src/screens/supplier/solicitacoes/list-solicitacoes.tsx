import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { stateColorDescription } from "@/helpers/state-colors-description";
import { useGetSupplierSolicitations } from "@/hooks/admin/solicitation/useGetSolicitation";
import { useRouter } from "next/navigation";
import React from "react";
import { Aprovar } from "./aprovar";
import { Select, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectContent } from "@radix-ui/react-select";

const states = [
  {
    label: "Pendente",
    value: "pending",
  },
  {
    label: "Aprovado",
    value: "approved",
  },
  {
    label: "Rejeitado",
    value: "rejected",
  },
  {
    label: "Cancelado",
    value: "canceled",
  },
];

export default function ListaSolicitacoes() {
  const { data, result, filtro } = useGetSupplierSolicitations({});
  const navigator = useRouter();

  if (result.isError) {
    return <div>Error ao carregar as solicitações.</div>;
  }
  if (result.isPending) {
    return (
      <div className="w-full flex flex-col gap-4">
        <Skeleton className="w-full h-10" />
        <div className="flex flex-col md:flex-row gap-4 md:justify-between">
          <Skeleton className="w-full md:w-[48%] h-32" />

          <Skeleton className="w-full md:w-[48%] h-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2 w-full ml-1">
        <label htmlFor="name">Estados</label>
        <div className="space-y-4 w-[300px]">
          <Select
            onValueChange={(e) => {
              filtro({
                state: e === "all" ? undefined : e,
              });
            }}
          >
            <SelectTrigger>Serviços</SelectTrigger>
            <SelectContent className="z-20">
              <SelectItem value="all" defaultChecked>
                Todos
              </SelectItem>
              {states.map((event, index) => (
                <SelectItem key={index} value={event.value}>
                  {event.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableCaption>Minhas solicitações.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Tipo de Evento</TableHead>
            <TableHead>Qnt Horas</TableHead>
            <TableHead className="text-left">Preço Total</TableHead>
            <TableHead className="text-right">Estado</TableHead>
            <TableHead className="text-right">...Outros</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.result.map((solicitation, index) => (
            <TableRow key={index}>
              <TableCell
                onClick={() =>
                  navigator.push(
                    `/supplier/dashboard-sup/solicitacoes/${solicitation.id}`
                  )
                }
                className="cursor-pointer py-1"
              >
                {solicitation.event.name}
              </TableCell>
              <TableCell
                onClick={() =>
                  navigator.push(
                    `/supplier/dashboard-sup/solicitacoes/${solicitation.id}`
                  )
                }
                className="cursor-pointer font-medium"
              >
                {solicitation.ammount_hours}
              </TableCell>

              <TableCell className="text-left">
                {solicitation.price} , 00 Kz
              </TableCell>
              <TableCell className={`text-right`}>
                <span
                  className={stateColorDescription(solicitation.state).color}
                >
                  {stateColorDescription(solicitation.state).description}
                </span>
              </TableCell>
              <TableCell className="text-right flex gap-4 justify-end">
                {solicitation.state === "pending" && (
                  <Aprovar salao={solicitation} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
