'use client';
import Carrossel from '@/components/caroussel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetRooms } from '@/hooks/admin/room/useGetRoom';
import { LocateFixedIcon, Stars, Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col /gap-6">
      <div className="relative">
        <div className="absolute z-10 top-0 left-0 right-0 bottom-0 /h-[80%] bg-black/40 from-black to-black/50 "></div>
        <Carrossel />
        <div className="absolute z-10 text-center top-1/2 left-1/2 space-y-3 -translate-y-1/2 -translate-x-1/2 text-white">
          <h1 className="text-xl md:text-5xl font-bold">
            Nós podemos realizar os teus sonhos
          </h1>
          <p className="hidden md:block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            soluta perspiciatis delectus sit distinctio autem veniam! Repellat
            itaque tenetur vitae. Voluptate fugit amet laborum ut consectetur
            dolores soluta itaque repellat!
          </p>
          <p className="md:hidden block">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod
            dolores soluta itaque repellat!
          </p>
          <Button className="rounded-full mt-5">Saiba mais sobre nós</Button>
        </div>
      </div>
      <div className="mx-2 md:mx-8 mt-8 md:mt-16 flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col gap-8">
          <h2 className="uppercase mx-auto border-l text-2xl md:text-4xl pl-2 border-l-primary/30 text-primary">
            Novidades
          </h2>
          <ListRoom />
        </div>
        <div className="flex flex-col gap-8 ">
          <h2 className="uppercase mx-auto border-l text-2xl md:text-4xl pl-2 border-l-primary/30 text-primary">
            Mais procurados
          </h2>

          <ListRoom />
        </div>
      </div>
    </div>
  );
}

function ListRoom() {
  const { data, result } = useGetRooms();
  const navigator = useRouter();
  return (
    <div className="flex flex-wrap justify-between gap-4 md:gap-6 m-auto">
      {result.isPending &&
        data?.result.map((room) => (
          <Card
            key={room.id}
            className="/min-w-[180px] md:w-[60%] h-auto md:h-[300px] p-0 overflow-hidden border hover:border-primary/40"
          >
            <CardContent className="p-0 flex">
              <div>
                <Image
                  src={room.image}
                  alt={room.name}
                  width={400}
                  height={200}
                  className="w-full h-[300px]"
                />
              </div>
              <div className="p-2 min-w-[240px] w-[240px] border flex flex-col gap-1 items-center text-foreground ">
                <p className="uppercase flex gap-1 items-center">
                  <Stars />
                  <span>{room.name}</span>
                </p>
                <p className="flex items-center gap-1 text-sm">
                  <Users size={15} /> Capaciade : {room.capacity}
                </p>
                <p className="/ml-auto">
                  <span className="text-sm italic">Preço : </span>

                  <span className="text-2xl text-primary">
                    {room.price_per_hour}{' '}
                  </span>
                  <span className="text-sm italic">Kz</span>
                </p>
                <div className="mt-2">
                  <h3 className="flex gap-1 items-center">
                    <LocateFixedIcon /> Localidade
                  </h3>
                  <ul className="space-y-1 pl-2 list-disc">
                    <li className="flex items-center gap-1 text-sm">
                      Cidade : {room?.address?.city?.name}
                    </li>
                    <li className="flex items-center gap-1 text-sm">
                      Distrito : {room?.address?.district}
                    </li>
                    <li className="flex items-center gap-1 text-sm">
                      Rua : {room?.address?.district}
                    </li>
                    <li className="flex items-center gap-1 text-sm">
                      Ponto de referência : {room?.address?.district}
                    </li>
                  </ul>
                </div>
                <div className="w-full mt-auto border">
                  <Button
                    className="w-full"
                    onClick={() => navigator.push(`/saloes/${room.id}`)}
                  >
                    Solicitar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      {result.isSuccess &&
        data?.result.map((room) => (
          <Card
            key={room.id}
            className="/min-w-[180px] md:w-[48%] h-auto md:h-[300px] p-0 overflow-hidden border hover:border-primary/40"
          >
            <CardContent className="p-0 flex">
              <div>
                <Image
                  src={room.image}
                  alt={room.name}
                  width={400}
                  height={200}
                  className="w-full h-[300px]"
                />
              </div>
              <div className="p-2 min-w-[240px] w-[240px] border flex flex-col gap-1 items-center text-foreground ">
                <p className="uppercase flex gap-1 items-center">
                  <Stars />
                  <span>{room.name}</span>
                </p>
                <p className="flex items-center gap-1 text-sm">
                  <Users size={15} /> Capaciade : {room.capacity}
                </p>
                <p className="/ml-auto">
                  <span className="text-sm italic">Preço : </span>

                  <span className="text-2xl text-primary">
                    {room.price_per_hour}{' '}
                  </span>
                  <span className="text-sm italic">Kz</span>
                </p>
                <div className="mt-2">
                  <h3 className="flex gap-1 items-center">
                    <LocateFixedIcon /> Localidade
                  </h3>
                  <ul className="space-y-1 pl-2 list-disc">
                    <li className="flex items-center gap-1 text-sm">
                      Cidade : {room?.address?.city?.name}
                    </li>
                    <li className="flex items-center gap-1 text-sm">
                      Distrito : {room?.address?.district}
                    </li>
                    <li className="flex items-center gap-1 text-sm">
                      Rua : {room?.address?.district}
                    </li>
                    <li className="flex items-center gap-1 text-sm">
                      Ponto de referência : {room?.address?.district}
                    </li>
                  </ul>
                </div>
                <div className="w-full mt-auto border">
                  <Button
                    className="w-full"
                    onClick={() => navigator.push(`/saloes/${room.id}`)}
                  >
                    Solicitar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
