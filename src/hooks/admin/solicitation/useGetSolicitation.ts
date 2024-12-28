import { SolicitationService } from "@/services/admin/Solicitation";

import { keepPreviousData, useQuery } from "@tanstack/react-query";

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
    queryKey: ["solicitations"],
    queryFn: () => service.getById(id),
    placeholderData: keepPreviousData,
  });

  return { data, result };
}

export function useGetSolicitationId(id: number) {
  const { data, ...result } = useQuery({
    queryKey: ["solicitations"],
    queryFn: () => service.getByIdClient(id),
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
