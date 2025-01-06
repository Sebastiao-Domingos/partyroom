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

export default function ListaSolicitacoes() {
  const { data, result } = useGetSupplierSolicitations();
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
    <div className="flex gap-4 flex-col md:flex-row md:justify-between">
      <Table>
        <TableCaption>Minhas solicitações.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Tipo de Evento</TableHead>
            <TableHead>Qnt Horas</TableHead>
            <TableHead className="text-left">Preço Total</TableHead>
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
              <TableCell className="text-right">
                {stateColorDescription(solicitation.state).description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
