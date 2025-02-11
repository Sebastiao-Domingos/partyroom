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
import Image from "next/image";
import { useGetDetailRoom } from "@/hooks/admin/room/useGetRoom";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PartyRoomCalendar from "./calendar";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function Salao({ params }: { params: { salao: number } }) {
  const navigator = useRouter();
  const [image, setImage] = useState({
    url: "",
    alt: "",
    index: 0,
  });
  const { data, result } = useGetDetailRoom(Number(params.salao));
  useEffect(() => {
    if (data?.image) {
      setImage({
        alt: data.name,
        url: data.image,
        index: 0,
      });
    }
  }, [data]);

  return (
    <div>
      <div className="mt-[100px] mx-1 md:mx-8">
        <h1 className="text-primary font-bold border-l pl-2 uppercase">
          Salões #{" "}
          <span className="text-primary/80">
            {" "}
            {result.isSuccess && data?.name}
          </span>
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
              <BreadcrumbPage className="text-[12px]">
                {result.isSuccess && data?.name}
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <div className="mt-6">
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
        {result.isSuccess && data && (
          <>
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full pl-2 md:pl-8 md:w-[65%] flex flex-col gap-6">
                <div className="w-full /md:w-auto">
                  <Image
                    src={image.url}
                    alt={image.url}
                    width={800}
                    height={600}
                    className="w-[100%] /md:w-auto"
                    loading="lazy"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    className={`border p-1 border-border hover:border-primary/50 ${
                      image.index === 0 && "border-primary"
                    }`}
                    onClick={() =>
                      setImage({
                        url: data.image,
                        alt: data.name,
                        index: 0,
                      })
                    }
                  >
                    <Image
                      src={data.image}
                      width={50}
                      height={50}
                      alt={data.name}
                      loading="lazy"
                    />
                  </button>
                  {data.images?.map((imag, index) => (
                    <button
                      key={imag.id}
                      className={`border p-1 border-border hover:border-primary/50 ${
                        image.index === index + 1 && "border-primary"
                      }`}
                      onClick={() => {
                        const currentImga = {
                          url: imag.image,
                          alt: imag.image,
                          index: index + 1,
                        };
                        setImage(() => currentImga);
                      }}
                    >
                      <Image
                        src={imag.image}
                        width={50}
                        height={50}
                        alt={imag.image}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-auto mt-6 md:mt-0 space-y-3 pl-2 md:pl-4">
                <div className="border-b border-border w-full pb-2">
                  <h3>
                    Informações do salão: #{" "}
                    <span className="text-primary/80">
                      {result.isSuccess && data?.name}
                    </span>
                  </h3>
                  <div className="space-y-2 mt-3 font-thin">
                    <p>Nome : {data?.name}</p>
                    <p>Capacidade : {data?.capacity}</p>

                    <p>
                      Disponibilidade :{" "}
                      {data?.is_available ? "Disponível" : "Indisponível"}
                    </p>
                    <p>Preço por hora : {data?.price_per_hour} Kz</p>
                    <p>Telefone : {data?.owner?.phone_number}</p>
                    <p>
                      Propetário : {data.owner?.first_name}{" "}
                      {data.owner?.last_name}
                    </p>
                  </div>
                </div>
                <div className="border-b border-border w-full pb-2">
                  <h3>
                    Endereço do salão: #{" "}
                    <span className="text-primary/80">
                      {result.isSuccess && data?.name}
                    </span>
                  </h3>
                  <div className="space-y-2 mt-3 font-thin">
                    <p>Província : Luanda</p>
                    <p>Município : {data?.address?.city.name}</p>
                    <p>Distrito : {data?.address?.district}</p>
                    <p>Ponto de referência : {data?.address?.land_mark}</p>
                  </div>
                </div>
                <div className="border-b border-border w-full pb-2">
                  <h3>
                    Tipos de eventos do salão: #{" "}
                    <span className="text-primary/80">{data?.name}</span>
                  </h3>
                  <div className="mt-3 font-thin flex gap-2 flex-wrap">
                    {data.event_types?.length === 0 && <p>Sem Eventos</p>}
                    {data.event_types?.map((event) => (
                      <p
                        key={event.id}
                        className="border-l-2 pl-2 first:border-l-0 first:pl-0"
                      >
                        {event.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="w-full pb-2">
                  <h3>
                    Serviços do salão: #{" "}
                    <span className="text-primary/80">{data?.name}</span>
                  </h3>
                  <div className="mt-3 font-thin flex gap-2 items-center flex-wrap">
                    {data.services?.length === 0 && <p>Sem Servições</p>}
                    {data.services?.map((service) => (
                      <p
                        key={service.id}
                        className="border-l-2 pl-2 first:border-l-0 first:pl-0"
                      >
                        {service.name}
                      </p>
                    ))}
                  </div>
                </div>
                {/* {data.is_available && (
                  <div className="w-full py-4 pr-2">
                    <Button
                      className="w-full"
                      onClick={() => {
                        console.log("ola");

                        navigator.push(`/saloes/${data.id}/solicitacao`);
                      }}
                    >
                      Fazer uma Reserva
                    </Button>
                  </div>
                )} */}
              </div>
            </div>
            <div className="mt-6 mx-2 md:mx-8 space-y-4">
              <h2 className="text-xl font-bold text-primary">
                Calendário das reservas do {data?.name}
              </h2>
              <div>
                <ScrollArea className="h-[600px] min-w-[500px] overflow-y-auto">
                  <PartyRoomCalendar
                    initialLocale="pt-br"
                    events={
                      data?.calendar?.map((event) => ({
                        title: "Reservado",
                        date: event.date.toString(),
                        start: event.start_time,
                        end: event.end_time,
                      })) ?? []
                    }
                  />
                </ScrollArea>
                {data.is_available && (
                  <div className="w-full text-right py-8 pr-2">
                    <Button
                      className="w-full md:w-[300px]"
                      onClick={() => {
                        console.log("ola");

                        navigator.push(`/saloes/${data.id}/solicitacao`);
                      }}
                    >
                      Fazer uma Reserva
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
