import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Users2Icon } from 'lucide-react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { ScrollBar } from '@/components/ui/scroll-area';
import Chart from '@/components/graphics/Chart';

export default function dashboard() {
  return (
    <div>
      <div className="">
        <h1 className="text-orange-500 font-bold border-l pl-2 uppercase">
          Dashboard
        </h1>
        <div className="pl-2 mt-2 text-[12px]">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbPage className="text-[12px]">Home</BreadcrumbPage>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#" className="text-[12px]">
                  Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="text-[12px]">Dashboard</BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      <ScrollArea className="w-[calc(100vw-250px)] flex gap-3 py-2 mt-6">
        <div className="w-full flex gap-3">
          {Array(4)
            .fill('')
            .map((_, index) => (
              <div
                key={index}
                className="relative w-[350px] flex flex-col gap-2 items-center text-center p-4 /bg-slate-100 pt-6 rounded border hover:border-orange-100"
              >
                <div className="absolute border-4 border-slate-100 -top-3 -right-3 size-14 flex justify-center items-center text-white font-bold rounded-full bg-orange-500">
                  0012
                </div>
                <Users2Icon size={40} className="text-slate-400" />
                <h2 className="text-xl font-thin text-orange-300">
                  Total de Fornecedores
                </h2>
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="mt-8 space-y-4">
        <div>
          <h2 className="text-orange-400">Balanço Geral</h2>
        </div>
        <Chart />
      </div>
    </div>
  );
}
