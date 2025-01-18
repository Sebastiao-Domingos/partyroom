import {
  SolicitationSearch,
  SolicitationService,
} from "@/services/admin/Solicitation";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";

const service = new SolicitationService();

export function useGetSolicitations() {
  const { data, ...result } = useQuery({
    queryFn: service.getAll,
    queryKey: ["solicitations"],
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetSolicitationDetail(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ["solicitation"],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetSolicitationId(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ["solicitations"],
    queryFn: () => service.getSolicitationById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetClientSolicitations() {
  const { data, ...result } = useQuery({
    queryKey: ["solicitations"],
    queryFn: service.getClientSolicitations,
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetSupplierSolicitations(
  params?: Partial<SolicitationSearch>
) {
  const [query, setQuery] = useState(params);
  const { data, ...result } = useQuery({
    queryKey: ["solicitations", query],
    queryFn: () => service.getSupplierSolicitions(query),
    placeholderData: keepPreviousData,
  });

  function filtro(filter: Partial<SolicitationSearch>) {
    setQuery((prev) => ({ ...prev, ...filter }));
  }

  return { data, result, filtro };
}
