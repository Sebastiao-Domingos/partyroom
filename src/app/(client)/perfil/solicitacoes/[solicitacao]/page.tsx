"use client";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPerPrice } from "@/helpers/format-price";
import { stateColorDescription } from "@/helpers/state-colors-description";
import { useGetSolicitationDetail } from "@/hooks/admin/solicitation/useGetSolicitation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Page({ params }: { params: { solicitacao: number } }) {
  const { data, result } = useGetSolicitationDetail(params.solicitacao);

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

  if (result.isError) {
    return <div>Erro ao carregar a solicitação</div>;
  }

  if (result.isSuccess && data)
    return (
      <>
        <div className="pl-2 text-[12px] md:mx-8 mt-4 ">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[12px]">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/perfil" className="text-[12px]">
                  Perfil
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-[12px]">
                Solicitação
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="mx-1 md:mx-8 mt-[30px] md:mt-[60px] flex gap-8 flex-col md:flex-row">
          <div className="w-full md:w-[47%]">
            <Image
              src={data.partyroom.image}
              width={300}
              height={300}
              alt="Foto do salão"
              className="w-full"
            />
          </div>
          <ul className="text-sm space-y-3">
            <li>
              <span className="">Nome do Salão </span>

              <span className="border-l pl-3 ml-3">{data.partyroom.name}</span>
            </li>
            <li>
              Tipo de Evento
              <span className="border-l pl-3 ml-3">{data.event.name}</span>
            </li>
            <li>
              Preço
              <span className="border-l pl-3 ml-3">
                {formatPerPrice(data?.price)}
              </span>
            </li>
            <li>
              Data
              <span className="border-l pl-3 ml-3">
                {new Date(data?.data).toLocaleDateString()}
              </span>
            </li>
            <li>
              Quantidade de Horas
              <span className="border-l pl-3 ml-3">{data?.ammount_hours}</span>
            </li>
            <li>
              Status
              <span
                className={cn(
                  "border-l pl-3 ml-3",
                  stateColorDescription(data?.state).color
                )}
              >
                {stateColorDescription(data?.state).description}
              </span>
            </li>
            <li>
              Proprietário do Salão
              <span className="border-l pl-3 ml-3">
                {`${data.partyroom.owner.first_name} - ${data.partyroom.owner.last_name}`}
              </span>
            </li>

            <li>
              Hora de Início
              <span className="border-l pl-3 ml-3">{data.begining_hour}</span>
            </li>
            <li>
              Cliente
              <span className="border-l pl-3 ml-3">
                {data.owner.last_name} - {data.owner.last_name}
              </span>
            </li>
          </ul>
        </div>
      </>
    );
}
