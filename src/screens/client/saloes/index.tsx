'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCities } from '@/hooks/admin/cities/useGetCities';
import { useGetEvents } from '@/hooks/admin/event/useGetEvent';
import { useGetRooms } from '@/hooks/admin/room/useGetRoom';
import { useGetservices } from '@/hooks/admin/service/useGetServices';
import { SearchParamsRooms } from '@/services/admin/Room';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function Saloes() {
  const navigator = useRouter();
  const [city, setCity] = useState('');
  const [event, setEvent] = useState('');
  const { data: citeis, result: result_citeis } = useGetCities();
  const { data: events, result: result_events } = useGetEvents();
  const { data: services, result: result_services } = useGetservices();
  const {
    data: rooms,
    result: result_rooms,
    filtro,
  } = useGetRooms({ page_size: 100 });
  const { register, handleSubmit } = useForm<SearchParamsRooms>();

  const submit = (query: SearchParamsRooms) => {
    query.city = Number(city);
    query.event = Number(event);
    filtro(query);
  };

  return (
    <div className="mt-[100px] mx-2 md:mx-8">
      <div>
        <h1 className="text-primary font-bold border-l pl-2 uppercase">
          Salões de festas
          <span className="text-primary/80"> </span>
        </h1>
        <form action="" onSubmit={handleSubmit(submit)}>
          <div className="w-full py-4 flex flex-col gap-2 md:flex-col md:gap-6 md:items-center md:mt-6">
            <div className="w-full flex gap-2 items-center justify-center">
              <div className="w-full md:w-[40%] relative ">
                <Input
                  placeholder="Pesquisar por nome "
                  className="rounded-full w-full pl-9"
                  {...register('name')}
                />
                <Search
                  className="absolute top-1/2 -translate-y-1/2 left-2 border-r pr-1"
                  size={24}
                />
              </div>
              <Button className="rounded-full">
                <Search className="mr-2" />
                <span className="hidden md:block">Pesquisar</span>
              </Button>
            </div>
            <div className="w-full flex flex-wrap md:flex-nowrap gap-2">
              <div className="space-y-2 w-full">
                <label htmlFor="city">Município</label>
                <Select value={city} onValueChange={(e) => setCity(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Municípios" />
                  </SelectTrigger>
                  <SelectContent
                    className="w-full"
                    id="city"
                    {...register('city')}
                  >
                    {result_citeis.isSuccess &&
                      citeis?.result.map((num, index) => (
                        <SelectItem key={index} value={num.id!.toString()}>
                          {num.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="event">
                  <span className="">Tipo de eventos</span>
                </label>
                <Select value={event} onValueChange={(e) => setEvent(e)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Eventos" />
                  </SelectTrigger>
                  <SelectContent className="w-full" id="event">
                    {result_events.isSuccess &&
                      events?.result.map((num, index) => (
                        <SelectItem key={index} value={num.id!.toString()}>
                          {num.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 w-full">
                <label htmlFor="service">
                  <span className="">Tipo de serviços</span>
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Serviços" />
                  </SelectTrigger>
                  <SelectContent className="w-full" id="service">
                    {result_services.isSuccess &&
                      services?.result.map((num, index) => (
                        <SelectItem key={index} value={num.id!.toString()}>
                          {num.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="py-6 mt-4 text-[12px] border-t">
        {result_rooms.isSuccess && (
          <>
            <div className="grid grid-flow-row gap-4 grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]">
              {rooms?.result.map((item) => (
                <Card
                  key={`${item.id}`}
                  onClick={() => navigator.push(`/saloes/${item.id}`)}
                  className="w-[150px] h-[240px] hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="w-full flex flex-col justify-between items-center gap-2 p-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="size-[80px] object-cover rounded-full"
                      width={50}
                      height={50}
                    />

                    <div className="flex flex-col justify-between">
                      <p className="text-xl text-center">{item.name}</p>
                      <p className="text-primary/80 text-2xl text-center">
                        {item.price_per_hour} Kz
                      </p>
                      <div className="flex justify-center items-center">
                        <p className="text-[14px] flex gap-2 justify-center items-center">
                          <span>{item.address.city.name}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {rooms?.total === 0 && (
              <p className="italic text-center md:text-xl">
                Nenhum salão encontrado!{' '}
              </p>
            )}
          </>
        )}

        {result_rooms.isPending && (
          <p className="italic text-center md:text-xl">
            Aguarde um pouco, carregando ...
          </p>
        )}
      </div>
    </div>
  );
}
