'use client';

import { Card } from '@/components/ui/card';
import { useGetEvents } from '@/hooks/admin/event/useGetEvent';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Eventos() {
  const navigator = useRouter();
  const { data: events, result: result_events } = useGetEvents();

  return (
    <div className="mt-[100px] mx-2 md:mx-8">
      <div>
        <h1 className="text-primary font-bold border-l pl-2 uppercase">
          Serviços encontrados nos salões
        </h1>
      </div>
      <div className="py-6 mt-4 text-[12px] border-t">
        {result_events.isSuccess && (
          <>
            <div className="grid grid-flow-row gap-4 grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))]">
              {events?.result.map((item) => (
                <Card
                  key={`${item.id}`}
                  onClick={() => navigator.push(`/eventos/${item.id}`)}
                  className="w-[150px] h-[160px] hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <div className="w-full flex flex-col justify-between items-center gap-2 p-4">
                    <Settings size={36} className="text-primary" />
                    <div className="flex flex-col justify-between">
                      <p className="text-xl text-center text-primary/70">
                        {item.name}
                      </p>
                      <div className="flex justify-center items-center">
                        <p className="text-[14px] flex gap-2 justify-center items-center">
                          <span>{item.created_at?.split('T')[0]}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {events?.total === 0 && (
              <p className="italic text-center md:text-xl">
                Nenhum serviço encontrado!{' '}
              </p>
            )}
          </>
        )}

        {result_events.isPending && (
          <p className="italic text-center md:text-xl">
            Aguarde um pouco, carregando ...
          </p>
        )}
      </div>
    </div>
  );
}
