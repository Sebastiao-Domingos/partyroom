import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetClientSolicitations } from "@/hooks/admin/solicitation/useGetSolicitation";
import React from "react";

export default function Solicitacoes() {
  const { data, result } = useGetClientSolicitations();
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
      <Card className="p-2 md:p-4 md:w-[48%]">
        Minhas solicitações
        {data?.result[0].price}
      </Card>
    </div>
  );
}
