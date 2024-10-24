'use client';
import Carrossel from '@/components/caroussel';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useGetRooms } from '@/hooks/admin/room/useGetRoom';
import { Users } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function home() {
  return (
    <div className="flex flex-col gap-6">
      <Carrossel />
      <div className="space-y-4">
        <h2 className="uppercase border-l text-2xl pl-2 border-l-primary/30 text-primary">
          Novidades
        </h2>
        <div className="flex w-full">
          <ListRoom />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="uppercase border-l text-2xl pl-2 border-l-primary/30 text-primary">
          Salões
        </h2>
        <div className="flex w-full">
          <ListRoom />
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="uppercase border-l text-2xl pl-2 border-l-primary/30 text-primary">
          Mais procurados
        </h2>
        <div className="w-full">
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
    <div className="flex flex-wrap /justify-between gap-4 m-auto">
      {result.isSuccess &&
        data?.result.map((room) => (
          <Card
            key={room.id}
            className="min-w-[180px] w-[18%] max-w-[300px] h-auto p-0 overflow-hidden border hover:border-primary/40"
          >
            <CardContent className="p-0">
              <div>
                <Image
                  src={room.image}
                  alt={room.name}
                  width={300}
                  height={200}
                  className="w-full h-[200px]"
                />
              </div>
              <div className="p-2 flex flex-col gap-2 mt-4">
                <p className="uppercase text-primary">{room.name}</p>
                <p className="flex items-center gap-1 text-sm">
                  <Users size={15} /> Capaciade : {room.capacity}
                </p>
                <p className="ml-auto">
                  <span className="text-sm italic">Preço : </span>

                  <span className="text-2xl text-primary">
                    {room.price_per_hour}{' '}
                  </span>
                  <span className="text-sm italic">Kz</span>
                </p>
              </div>
              <div className="p-2 w-full">
                <Button
                  className="w-full"
                  onClick={() => navigator.push(`/saloes/${room.id}`)}
                >
                  Solicitar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
}
