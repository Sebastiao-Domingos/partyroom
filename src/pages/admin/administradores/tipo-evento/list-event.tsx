'use client';
import React from 'react';

import { Button } from '@/components/ui/button';
import { ArchiveXIcon, Edit2Icon } from 'lucide-react';
import { useGetEvent } from '@/hooks/admin/event/useGetEvent';

export default function ListEvent() {
  const { error, event, loading } = useGetEvent();
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {loading && (
        <div className="text-center text-primary font-semibold">
          Carregando...
        </div>
      )}
      {error && (
        <div className="text-center text-destructive font-semibold">
          {error}
        </div>
      )}

      {event?.result.map((item, index) => (
        <div
          key={index}
          className="flex flex-col w-[32%] p-2 border border-border rounded hover:border-primary/50"
        >
          <div className="flex flex-col">
            <p className="">{item.name}</p>
            <p className="text-sm italic text-slate-400">
              {item.created_at?.split('T')[0]}
            </p>
          </div>
          <div className="flex gap-3 ml-auto">
            <Button size={'icon'} variant={'outline_edit'}>
              <Edit2Icon />
            </Button>
            <Button className="" size={'icon'} variant="outline_desttructive">
              <ArchiveXIcon />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
