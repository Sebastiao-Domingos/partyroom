"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetDetailRoom } from "@/hooks/admin/room/useGetRoom";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { formatPerPrice } from "@/helpers/format-price";
import { Button } from "@/components/ui/button";
import { useActionSolicitation } from "@/hooks/admin/solicitation/useActionSolicitation";
import { useForm } from "react-hook-form";
import { Solicitation } from "@/services/admin/Solicitation";
import { toast } from "react-toastify";
import { useGetUserData } from "@/hooks/auth/useGetUserData";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { SelectValue } from "@radix-ui/react-select";

export default function Solicitacao({ params }: { params: { salao: number } }) {
  const [horas, setHoras] = useState(0);
  const [preco, setPreco] = useState(0);
  const [evento, setEvento] = useState(-1);
  const { data, result } = useGetDetailRoom(Number(params.salao));
  const { mutationCreate } = useActionSolicitation();
  const { register, handleSubmit } = useForm<Solicitation>();
  const { user, status } = useGetUserData();
  const navigator = useRouter();

  useEffect(() => {
    setPreco(() => horas * Number(data?.price_per_hour));
  }, [horas, data]);

  if (status === "error" || user === undefined) {
    window.location.href = "/login";
  }

  if (user && status === "success") {
    const handle_solicitation = (data: Solicitation) => {
      data.state = "pending";

      if (evento === -1) {
        toast("Escolhe o tipo de evento", {
          type: "warning",
        });
        return;
      }
      data.owner = Number(user.id);
      data.event = evento;
      data.price = preco;
      data.partyroom = Number(params.salao);
      data.ammount_hours = horas;
      console.log(data);

      mutationCreate.mutate(data);
    };

    if (mutationCreate.isSuccess) {
      toast("Marcação feita com sucesso", {
        type: "success",
        onClose: () => {
          navigator.push("/perfil");
        },
      });
    }

    if (mutationCreate.isError) {
      toast("Erro ao criar a solicitação : " + mutationCreate.error.message, {
        type: "error",
      });
    }
    return (
      <div className="w-full flex flex-col">
        <div className="mt-[100px] mx-1 md:mx-8">
          <h1 className="text-primary font-bold border-l pl-2 uppercase">
            Salões #{" "}
            <span className="text-primary/80">
              {" "}
              {result.isSuccess && data?.name}
            </span>
            # Solicitação
          </h1>
          <div className="pl-2 mt-2 text-[12px]">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[12px]">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/saloes" className="text-[12px]">
                    Salões
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  href={`/saloes/${params.salao}`}
                  className="text-[12px]"
                >
                  {result.isSuccess && data?.name}
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbPage className="text-[12px]">
                  Solicitação
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="mt-6 mx-1 md:mx-auto md:max-w-[900px] md:min-w-[650px]">
          {result.isLoading && (
            <div className="flex justify-center items-center h-full">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {result.isError && (
            <div className="text-center text-destructive font-semibold">
              {result.error.message}
            </div>
          )}
          {result.isSuccess && (
            <div>
              <form
                className="space-y-4"
                onSubmit={handleSubmit(handle_solicitation)}
              >
                <fieldset className="p-2 py-3 rounded border space-y-3">
                  <legend className="px-2">Informações do salão</legend>
                  {/* fields */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 w-full">
                      <label htmlFor="name">Nome do salão</label>
                      <Input
                        type="text"
                        placeholder="Nome do salão"
                        value={data?.name}
                        disabled
                        //   {...register('name', { required: true })}
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <label htmlFor="name">Capacidade</label>
                      <Input
                        type="number"
                        placeholder="Capacidade"
                        value={data?.capacity}
                        disabled
                        //   {...register('capacity', { required: true })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 w-full">
                      <label>Preço por hora / Kzs</label>
                      <Input
                        type="text"
                        value={data?.price_per_hour}
                        disabled
                        //   {...register('name', { required: true })}
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <label htmlFor="name">Municípo</label>
                      <Input
                        type="text"
                        value={data?.address.city.name}
                        disabled
                        //   {...register('capacity', { required: true })}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 w-full">
                      <label>Distrito</label>
                      <Input
                        type="text"
                        value={data?.address.district}
                        disabled
                        //   {...register('name', { required: true })}
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <label htmlFor="name">Rua</label>
                      <Input
                        type="text"
                        disabled
                        value={data?.address.street}
                        //   {...register('capacity', { required: true })}
                      />
                    </div>
                  </div>
                </fieldset>
                <fieldset className="p-2 py-3 rounded border space-y-3">
                  <legend className="px-2">Informações adicionais</legend>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 w-full">
                      <label htmlFor="name">Tipo de evento</label>
                      <Select onValueChange={(e) => setEvento(Number(e))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Eventos" />
                        </SelectTrigger>
                        <SelectContent>
                          {data?.event_types.map((event, index) => {
                            return (
                              <SelectItem
                                key={index}
                                value={event.id!.toString()}
                              >
                                {event.name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 w-full">
                      <label>Quantidades de horas</label>
                      <Input
                        type="number"
                        placeholder="Quantidades de horas"
                        value={horas}
                        onChange={(e) => {
                          setHoras(() => Number(e.currentTarget.value));
                        }}
                        min={1}
                        max={24}
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 w-full">
                      <label htmlFor="name">Data da actividade</label>
                      <Input
                        type="date"
                        placeholder="Data da actividade"
                        {...register("data", { required: true })}
                      />
                    </div>
                    <div className="space-y-2 w-full">
                      <label htmlFor="name">Hora de início</label>
                      <Input
                        type="time"
                        placeholder="Hora de início"
                        {...register("begining_hour", { required: true })}
                      />
                    </div>
                  </div>
                </fieldset>
                <div className="flex flex-col md:flex-row gap-4">
                  <p>
                    Valor a pagar :
                    <span className="text-xl md:text-2xl font-bold px-2">
                      {result.isSuccess && formatPerPrice(preco)} Kz
                    </span>
                  </p>
                </div>
                <div className="w-full flex justify-between items-center">
                  <Button
                    className="m-auto w-full md:w-auto"
                    disabled={mutationCreate.isPending}
                  >
                    {mutationCreate.isPending ? (
                      <Loader />
                    ) : (
                      "Concluir a marcaçã"
                    )}
                    o
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (status === "pending")
    <div className="w-full flex items-center">
      <p>Processando....</p>
    </div>;
}
